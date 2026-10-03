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
          const tool = JSON.parse(
            fs.readFileSync(path.join(dir, file), "utf8"),
          );
          if (file !== `${tool.id}.json`)
            throw new Error("filename must match the tool id");
          return tool;
        } catch (error) {
          throw new Error(
            `Invalid content/tools/${file}: ${(error as Error).message}`,
          );
        }
      }),
  );
  return tools.sort(
    (a, b) =>
      Number(!!b.featured) - Number(!!a.featured) ||
      a.name.localeCompare(b.name),
  );
}
