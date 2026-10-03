import { asset } from "@/lib/paths";
export function workspacePath(original: string) {
  const [path, query] = original.split("?");
  const migrated = path.replace(/^\/tools\/rate-performance/, "/lab/rate-performance");
  return `${asset(migrated.replace(/\/$/, "") + "/")}${query ? `?${query}` : ""}`;
}
