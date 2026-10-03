export const categories = [
  "structure",
  "diffraction",
  "microscopy",
  "electrochemistry",
  "simulation",
  "utilities",
] as const;
export type Category = (typeof categories)[number];
export type Tool = {
  id: string;
  name: string;
  version: string;
  category: Category;
  type: "desktop" | "online" | "hybrid";
  description: string;
  platforms: string[];
  icon: string;
  screenshots: string[];
  download: string;
  online: string;
  github: string;
  documentation: string;
  citation: string;
  demo?: boolean;
  featured?: boolean;
  updated?: string;
  developer?: string;
  features?: string[];
  history?: { version: string; date: string; notes: string }[];
};
export function validLink(value: unknown): value is string {
  if (typeof value !== "string" || !value || /[\s\\<>"\x00-\x1f]/.test(value))
    return false;
  if (/^\/(?!\/)/.test(value)) return true;
  if (!value.startsWith("https://")) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !!url.hostname;
  } catch {
    return false;
  }
}
export function validateTool(input: unknown): Tool {
  if (!input || typeof input !== "object" || Array.isArray(input))
    throw new Error("Tool must be a JSON object");
  const t = input as Record<string, unknown>;
  for (const key of ["id", "name", "version", "description"])
    if (typeof t[key] !== "string" || !(t[key] as string).trim())
      throw new Error(`Missing ${key}`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(t.id as string))
    throw new Error("Invalid tool id");
  if (!categories.includes(t.category as Category))
    throw new Error("Invalid category");
  if (!["desktop", "online", "hybrid"].includes(t.type as string))
    throw new Error("Invalid type");
  for (const key of ["platforms", "screenshots"])
    if (
      !Array.isArray(t[key]) ||
      !(t[key] as unknown[]).every((x) => typeof x === "string")
    )
      throw new Error(`Invalid ${key}`);
  for (const key of ["download", "online", "github", "documentation"])
    if (
      t[key] !== undefined &&
      (typeof t[key] !== "string" || (t[key] !== "" && !validLink(t[key])))
    )
      throw new Error(`Invalid ${key} URL`);
  for (const key of ["icon", "citation", "developer"])
    if (t[key] !== undefined && typeof t[key] !== "string")
      throw new Error(`Invalid ${key}`);
  for (const key of ["demo", "featured"])
    if (t[key] !== undefined && typeof t[key] !== "boolean")
      throw new Error(`Invalid ${key}`);
  if (
    t.updated !== undefined &&
    (typeof t.updated !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(t.updated) ||
      Number.isNaN(Date.parse(t.updated)))
  )
    throw new Error("Invalid updated date");
  if (
    t.features !== undefined &&
    (!Array.isArray(t.features) ||
      !t.features.every((x) => typeof x === "string"))
  )
    throw new Error("Invalid features");
  if (
    t.history !== undefined &&
    (!Array.isArray(t.history) ||
      !t.history.every(
        (x) =>
          x &&
          typeof x === "object" &&
          ["version", "date", "notes"].every((k) => typeof x[k] === "string"),
      ))
  )
    throw new Error("Invalid history");
  return {
    icon: "",
    download: "",
    online: "",
    github: "",
    documentation: "",
    citation: "",
    ...t,
  } as Tool;
}
export function validateRegistry(inputs: unknown[]): Tool[] {
  const tools = inputs.map(validateTool);
  const ids = new Set<string>();
  for (const t of tools) {
    if (ids.has(t.id)) throw new Error(`Duplicate tool id: ${t.id}`);
    ids.add(t.id);
  }
  return tools;
}
