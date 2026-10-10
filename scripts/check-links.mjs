import fs from "node:fs";
import path from "node:path";
const root = path.resolve("out");
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const files = fs
  .readdirSync(root, { recursive: true })
  .filter((f) => String(f).endsWith(".html"));
const redirects = JSON.parse(fs.readFileSync("vercel.json", "utf8")).redirects || [];
const redirected = (relative) => redirects.some(({ source }) => relative.startsWith(source.replace(":path*", "")));
const failures = [];
let count = 0;
for (const name of files) {
  const html = fs.readFileSync(path.join(root, name), "utf8");
  for (const match of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
    const value = match[1].replaceAll("&amp;", "&");
    if (!value || value.startsWith("#") || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value)) continue;
    const pageUrl = `http://localhost${base}/${String(name).replaceAll(path.sep, "/")}`;
    const pathname = new URL(value, pageUrl).pathname;
    if (base && !(pathname === base || pathname.startsWith(`${base}/`))) {
      failures.push(`${name}: missing base path ${value}`);
      continue;
    }
    const relative = base ? pathname.slice(base.length) : pathname;
    let target = path.join(root, decodeURIComponent(relative));
    if (fs.existsSync(target) && fs.statSync(target).isDirectory())
      target = path.join(target, "index.html");
    count++;
    if (!fs.existsSync(target) && !redirected(relative)) failures.push(`${name}: ${value}`);
  }
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(
  `Checked ${files.length} exported pages and ${count} local links/assets. No broken targets.`,
);
