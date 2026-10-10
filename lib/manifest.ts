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
  type: "desktop" | "online" | "hybrid" | "skill";
  description: string;
  platforms: string[];
  icon: string;
  screenshots: string[];
  download: string;
  online: string;
  github: string;
  documentation: string;
  citation: string;
  release?: string;
  windowsActivationRequired?: boolean;
  offlineDownloadUnavailable?: boolean;
  web?: string;
  zh?: {
    description?: string;
    features?: string[];
    historyNotes?: Record<string, string>;
  };
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
export function isAvailable(tool: Tool): boolean {
  return (
    !tool.demo &&
    (validLink(tool.online) ||
      validLink(tool.download) ||
      (tool.type === "skill" && validLink(tool.documentation)))
  );
}
export function validateTool(input: unknown): Tool {
  if (!input || typeof input !== "object" || Array.isArray(input))
    throw new Error("Tool must be a JSON object");
  const t = input as Record<string, unknown>;
  const publicFields = [
    "id",
    "name",
    "version",
    "category",
    "type",
    "description",
    "platforms",
    "icon",
    "screenshots",
    "download",
    "online",
    "github",
    "documentation",
    "citation",
    "release",
    "web",
    "zh",
    "demo",
    "featured",
    "updated",
    "developer",
    "features",
    "history",
    "windowsActivationRequired",
    "offlineDownloadUnavailable",
  ];
  if (Object.keys(t).some((key) => !publicFields.includes(key)))
    throw new Error(
      "Unknown manifest field: publish only documented tool metadata",
    );
  for (const key of ["id", "name", "version", "description"])
    if (typeof t[key] !== "string" || !(t[key] as string).trim())
      throw new Error(`Missing ${key}`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(t.id as string))
    throw new Error("Invalid tool id");
  if (!categories.includes(t.category as Category))
    throw new Error("Invalid category");
  if (!["desktop", "online", "hybrid", "skill"].includes(t.type as string))
    throw new Error("Invalid type");
  for (const key of ["platforms", "screenshots"])
    if (
      !Array.isArray(t[key]) ||
      !(t[key] as unknown[]).every((x) => typeof x === "string")
    )
      throw new Error(`Invalid ${key}`);
  for (const key of [
    "download",
    "online",
    "github",
    "documentation",
    "release",
  ])
    if (
      t[key] !== undefined &&
      (typeof t[key] !== "string" || (t[key] !== "" && !validLink(t[key])))
    )
      throw new Error(`Invalid ${key} URL`);
  for (const value of [t.icon, ...(t.screenshots as string[])])
    if (value && (typeof value !== "string" || !validAsset(value)))
      throw new Error("Invalid image path");
  if (
    t.web !== undefined &&
    (typeof t.web !== "string" ||
      !validAsset(t.web) ||
      !t.web.endsWith(".html") ||
      (t.web.startsWith("/") && !t.web.startsWith(`/tools/${t.id}/app/`)) ||
      t.web.startsWith("https://") ||
      (t.type !== "online" && t.type !== "hybrid") ||
      t.demo)
  )
    throw new Error(
      "Invalid web entry: use a local HTML build entry for an online or hybrid release",
    );
  if (t.zh !== undefined) {
    const zh = t.zh as Record<string, unknown>;
    if (
      !zh ||
      typeof zh !== "object" ||
      Array.isArray(zh) ||
      Object.keys(zh).some(
        (key) => !["description", "features", "historyNotes"].includes(key),
      ) ||
      (zh.description !== undefined && typeof zh.description !== "string") ||
      (zh.features !== undefined &&
        (!Array.isArray(zh.features) ||
          !zh.features.every((x) => typeof x === "string"))) ||
      (zh.historyNotes !== undefined &&
        (!zh.historyNotes ||
          typeof zh.historyNotes !== "object" ||
          Array.isArray(zh.historyNotes) ||
          !Object.values(zh.historyNotes).every((x) => typeof x === "string")))
    )
      throw new Error("Invalid Chinese translation");
  }
  for (const key of ["icon", "citation", "developer"])
    if (t[key] !== undefined && typeof t[key] !== "string")
      throw new Error(`Invalid ${key}`);
  for (const key of [
    "demo",
    "featured",
    "windowsActivationRequired",
    "offlineDownloadUnavailable",
  ])
    if (t[key] !== undefined && typeof t[key] !== "boolean")
      throw new Error(`Invalid ${key}`);
  if (t.offlineDownloadUnavailable && t.download)
    throw new Error(
      "Offline download hold cannot include an active download URL",
    );
  if (
    t.windowsActivationRequired &&
    ((t.type !== "desktop" && t.type !== "hybrid") ||
      !(t.platforms as string[]).some((platform) =>
        /^windows(?:\b|$)/i.test(platform),
      ))
  )
    throw new Error(
      "Windows activation requires a Windows desktop or hybrid client",
    );
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
          Object.keys(x).every((key) =>
            ["version", "date", "notes"].includes(key),
          ) &&
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
export function validAsset(value: string): boolean {
  if (!value || /[\\<>"\s?#\x00-\x1f]/.test(value)) return false;
  if (value.startsWith("https://")) return validLink(value);
  if (value.startsWith("//") || value.includes(":") || /%/i.test(value))
    return false;
  return !value
    .split("/")
    .some(
      (part) =>
        part === ".." || part === "." || (!part && value.indexOf("//") >= 0),
    );
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
