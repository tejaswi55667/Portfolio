import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function prerender() {
  const serverPath = path.resolve(__dirname, "./dist/server/server.js");
  if (!fs.existsSync(serverPath)) {
    console.error("Server bundle not found at", serverPath);
    return;
  }

  const { default: handler } = await import(pathToFileURL(serverPath).href);
  const response = await handler.fetch(new Request("http://localhost/"), {}, {});
  const html = await response.text();

  const clientDir = path.resolve(__dirname, "./dist/client");
  fs.writeFileSync(path.join(clientDir, "index.html"), html, "utf8");
  fs.writeFileSync(path.join(clientDir, "404.html"), html, "utf8");
  console.log("✓ Pre-rendered static HTML to dist/client/index.html & 404.html");
}

prerender().catch(console.error);
