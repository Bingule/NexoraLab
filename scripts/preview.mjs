import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve("out");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
};
// Infer the exported base path so preview matches the last build.
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const base = html.match(/href="([^"\s]*)\/_next\//)?.[1] || "";
const server = http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
  } catch {
    res.writeHead(400);
    res.end("Bad request");
    return;
  }
  if (base && pathname === "/") {
    res.writeHead(302, { Location: `${base}/` });
    res.end();
    return;
  }
  if (base && !(pathname === base || pathname.startsWith(`${base}/`))) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  if (base) pathname = pathname.slice(base.length) || "/";
  const filePath = path.resolve(root, `.${pathname}`);
  if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  let file = filePath;
  if (fs.existsSync(file) && fs.statSync(file).isDirectory())
    file = path.join(file, "index.html");
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(fs.readFileSync(path.join(root, "404.html")));
    return;
  }
  res.writeHead(200, {
    "Content-Type": types[path.extname(file)] || "application/octet-stream",
  });
  fs.createReadStream(file).pipe(res);
});
server.listen(Number(process.env.PORT || 4173), "127.0.0.1", () =>
  console.log(
    `NexoraLab preview: http://127.0.0.1:${server.address().port}${base}/`,
  ),
);
