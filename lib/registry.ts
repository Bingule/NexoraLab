import fs from "node:fs";
import path from "node:path";
import { validateRegistry } from "./manifest";

export function getTools() {
  const dir = path.join(process.cwd(), "content/tools");
  const tools = validateRegistry(
    fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".json"))
      .sort()
      .map((file) => {
        try {
          return JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
        } catch {
          throw new Error(`Invalid JSON in content/tools/${file}`);
        }
      }),
  );
  return tools.sort(
    (a, b) =>
      Number(!!b.featured) - Number(!!a.featured) ||
      a.name.localeCompare(b.name),
  );
}
