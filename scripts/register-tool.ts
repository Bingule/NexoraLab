import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateTool, validAsset } from "../lib/manifest.ts";
import { assertPublicAsset } from "../lib/publication.ts";

type Options = { site?: string; replace?: boolean; dryRun?: boolean };
function localFile(root: string, name: string) {
  if (!validAsset(name) || name.startsWith("/") || name.startsWith("https://"))
    throw new Error(`Invalid local path: ${name}`);
  const file = path.resolve(root, name);
  const real = fs.realpathSync(file),
    relative = path.relative(fs.realpathSync(root), real);
  if (
    relative.startsWith("..") ||
    path.isAbsolute(relative) ||
    !fs.statSync(file).isFile()
  )
    throw new Error(`Asset must be a file inside the project: ${name}`);
  return file;
}
export function registerTool(input: string, options: Options = {}) {
  const source = path.resolve(input);
  let manifest = source;
  if (fs.statSync(source).isDirectory()) {
    manifest = path.join(source, "aimatralab.json");
    // Existing independent projects may still contain the previous manifest name.
    const legacy = path.join(source, "nexoralab.json");
    if (!fs.existsSync(manifest) && fs.existsSync(legacy)) manifest = legacy;
  }
  const project = path.dirname(manifest);
  const metadata = fs.readFileSync(manifest);
  assertPublicAsset(path.basename(manifest), metadata);
  const tool = validateTool(JSON.parse(metadata.toString("utf8")));
  const site = path.resolve(
    options.site || fileURLToPath(new URL("../", import.meta.url)),
  );
  const registry = path.join(site, "content/tools", `${tool.id}.json`);
  if (fs.existsSync(registry) && !options.replace)
    throw new Error(`${tool.id} already exists. Use --replace to update it.`);
  const images = [tool.icon, ...tool.screenshots].filter(
    (s) => s && !s.startsWith("/") && !s.startsWith("https://"),
  );
  for (const image of images) {
    if (!/\.(png|jpe?g|webp|gif|svg)$/i.test(image) || image.startsWith("app/"))
      throw new Error(`Unsupported image path: ${image}`);
    const file = localFile(project, image);
    assertPublicAsset(image, fs.readFileSync(file));
  }
  let build: string | undefined;
  if (tool.web) {
    if (tool.web.startsWith("/"))
      throw new Error(
        "Project manifest web must point to a local built HTML file, e.g. dist/index.html",
      );
    const entry = localFile(project, tool.web);
    build = path.dirname(entry);
    if (build === project)
      throw new Error(
        "Put the web release in its own build directory, e.g. dist/index.html",
      );
    // Check every build artifact before copying; do not follow links outside the project.
    for (const item of fs.readdirSync(build, {
      recursive: true,
      withFileTypes: true,
    })) {
      if (item.isSymbolicLink())
        throw new Error("Web builds may not contain symbolic links");
      if (item.isFile()) {
        const file = localFile(
          project,
          path
            .relative(project, path.join(item.parentPath, item.name))
            .replaceAll(path.sep, "/"),
        );
        assertPublicAsset(path.relative(build, file), fs.readFileSync(file));
      }
    }
    tool.web = `/tools/${tool.id}/app/${path.basename(entry)}`;
    tool.online = `/lab/${tool.id}/`;
  }
  if (options.dryRun) return tool;
  const target = path.join(site, "public/tools", tool.id);
  fs.mkdirSync(target, { recursive: true });
  for (const image of images) {
    const destination = path.join(target, image);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(localFile(project, image), destination);
  }
  if (build) {
    const staged = fs.mkdtempSync(path.join(target, ".app-next-"));
    const previous = `${staged}-previous`,
      app = path.join(target, "app");
    try {
      fs.cpSync(build, staged, { recursive: true });
      if (fs.existsSync(app)) fs.renameSync(app, previous);
      try {
        fs.renameSync(staged, app);
      } catch (error) {
        if (fs.existsSync(previous)) fs.renameSync(previous, app);
        throw error;
      }
    } finally {
      for (const temporary of [staged, previous]) {
        if (
          path.dirname(temporary) !== target ||
          !path.basename(temporary).startsWith(".app-next-")
        )
          throw new Error("Unexpected staging path");
        fs.rmSync(temporary, { recursive: true, force: true });
      }
    }
  }
  fs.mkdirSync(path.dirname(registry), { recursive: true });
  fs.writeFileSync(registry, JSON.stringify(tool, null, 2) + "\n");
  return tool;
}
if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const args = process.argv.slice(2),
    flags = args.filter((arg) => arg.startsWith("--")),
    inputs = args.filter((arg) => !arg.startsWith("--"));
  try {
    if (
      inputs.length !== 1 ||
      flags.some((arg) => !["--replace", "--dry-run"].includes(arg))
    )
      throw new Error(
        "Usage: npm run register -- <project-folder-or-aimatralab.json> [--dry-run] [--replace]",
      );
    const tool = registerTool(inputs[0], {
      replace: flags.includes("--replace"),
      dryRun: flags.includes("--dry-run"),
    });
    console.log(
      `${flags.includes("--dry-run") ? "Validated" : "Registered"} ${tool.name} v${tool.version} → /tools/${tool.id}/${tool.web ? ` + /lab/${tool.id}/` : ""}`,
    );
  } catch (error) {
    console.error((error as Error).message);
    process.exitCode = 1;
  }
}
