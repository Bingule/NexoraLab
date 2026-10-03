import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { registerTool } from "../scripts/register-tool.ts";

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "nexoralab-register-"));
  const project = path.join(root, "project"),
    site = path.join(root, "site");
  fs.mkdirSync(path.join(project, "dist"), { recursive: true });
  fs.writeFileSync(
    path.join(project, "dist/index.html"),
    '<script src="app.js"></script>',
  );
  fs.writeFileSync(
    path.join(project, "dist/app.js"),
    "console.log('real app')",
  );
  fs.writeFileSync(path.join(project, "screen.png"), "screenshot");
  const manifest = {
    id: "first-tool",
    name: "First Tool",
    version: "1.0.0",
    category: "utilities",
    type: "online",
    description: "A real tool.",
    platforms: ["Web"],
    screenshots: ["screen.png"],
    web: "dist/index.html",
    release: "https://github.com/example/tool/releases/tag/v1.0.0",
    download:
      "https://github.com/example/tool/releases/download/v1.0.0/tool.zip",
    zh: { description: "真实工具" },
  };
  const write = (patch = {}) =>
    fs.writeFileSync(
      path.join(project, "nexoralab.json"),
      JSON.stringify({ ...manifest, ...patch }),
    );
  write();
  return { root, project, site, write };
}
test("independent local project imports metadata and built assets without moving source", () => {
  const f = fixture();
  try {
    registerTool(f.project, { site: f.site, dryRun: true });
    assert.equal(fs.existsSync(f.site), false);
    registerTool(f.project, { site: f.site });
    fs.writeFileSync(
      path.join(f.project, "dist/obsolete.js"),
      "old build artifact",
    );
    registerTool(f.project, { site: f.site, replace: true });
    fs.rmSync(path.join(f.project, "dist/obsolete.js"));
    const saved = JSON.parse(
      fs.readFileSync(
        path.join(f.site, "content/tools/first-tool.json"),
        "utf8",
      ),
    );
    assert.equal(saved.web, "/tools/first-tool/app/index.html");
    assert.equal(saved.online, "/lab/first-tool/");
    assert.equal(saved.zh.description, "真实工具");
    assert.equal(
      fs.readFileSync(
        path.join(f.site, "public/tools/first-tool/app/app.js"),
        "utf8",
      ),
      "console.log('real app')",
    );
    assert.ok(fs.existsSync(path.join(f.project, "dist/index.html")));
    assert.throws(() => registerTool(f.project, { site: f.site }), /replace/);
    f.write({ version: "1.1.0" });
    registerTool(path.join(f.project, "nexoralab.json"), {
      site: f.site,
      replace: true,
    });
    assert.equal(
      fs.existsSync(
        path.join(f.site, "public/tools/first-tool/app/obsolete.js"),
      ),
      false,
    );
    assert.equal(
      JSON.parse(
        fs.readFileSync(
          path.join(f.site, "content/tools/first-tool.json"),
          "utf8",
        ),
      ).version,
      "1.1.0",
    );
  } finally {
    fs.rmSync(f.root, { recursive: true, force: true });
  }
});
test("invalid links, missing assets and escaping paths do not alter the registry", () => {
  const f = fixture();
  try {
    registerTool(f.project, { site: f.site });
    const before = fs.readFileSync(
      path.join(f.site, "content/tools/first-tool.json"),
      "utf8",
    );
    for (const patch of [
      { download: "javascript:bad" },
      { screenshots: ["missing.png"] },
      { screenshots: ["../outside.png"] },
      { web: "../index.html" },
    ]) {
      f.write(patch);
      assert.throws(() =>
        registerTool(f.project, { site: f.site, replace: true }),
      );
      assert.equal(
        fs.readFileSync(
          path.join(f.site, "content/tools/first-tool.json"),
          "utf8",
        ),
        before,
      );
    }
  } finally {
    fs.rmSync(f.root, { recursive: true, force: true });
  }
});
