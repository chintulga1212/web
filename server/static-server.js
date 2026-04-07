import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const host = "0.0.0.0";
const port = Number(process.env.PORT || 3000);
const distDir = resolve(process.cwd(), "dist");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".webp": "image/webp",
};

const server = createServer((req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);
  const pathname = decodeURIComponent(url.pathname);

  if (pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  const requestedPath = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  let filePath = join(distDir, requestedPath === "/" ? "index.html" : requestedPath);
  const hasExtension = extname(requestedPath).length > 0;

  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, "index.html");
  }

  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    if (hasExtension) {
      res.writeHead(404, {
        "Content-Type": "text/plain; charset=utf-8",
      });
      res.end("Not found");
      return;
    }

    filePath = join(distDir, "index.html");
  }

  const extension = extname(filePath).toLowerCase();
  const contentType = mimeTypes[extension] || "application/octet-stream";

  res.writeHead(200, {
    "Content-Type": contentType,
    "Cache-Control":
      extension === ".html"
        ? "no-cache"
        : "public, max-age=31536000, immutable",
  });

  createReadStream(filePath).pipe(res);
});

server.listen(port, host, () => {
  console.log(`Static server running on http://${host}:${port}`);
});
