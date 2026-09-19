import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const serverDir = path.join(root, "dist-ssr");

await build({
  configFile: path.join(root, "vite.config.ts"),
  root,
  build: {
    ssr: path.join(root, "src/entry-server.tsx"),
    outDir: serverDir,
    emptyOutDir: true,
  },
});

const serverEntry = pathToFileURL(path.join(serverDir, "entry-server.js")).href;
const { render, getPrerenderRoutes } = await import(serverEntry);
const template = readFileSync(path.join(dist, "index.html"), "utf8");
const routes = getPrerenderRoutes();

function extractLeadingHeadTags(html) {
  const tags = [];
  let rest = html;
  while (true) {
    const match = rest.match(/^<(title|meta|link)\b[\s\S]*?(?:\/>|<\/title>)/);
    if (!match) break;
    tags.push(match[0]);
    rest = rest.slice(match[0].length);
  }
  return { head: tags.join("\n"), html: rest };
}

for (const url of routes) {
  const rendered = render(url);
  const extracted = extractLeadingHeadTags(rendered.html);
  const head = [rendered.head, extracted.head].filter(Boolean).join("\n");
  const page = template
    .replace("<title>GetAppGo</title>", "")
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", extracted.html);
  const outPath =
    url === "/" ? path.join(dist, "index.html") : path.join(dist, url.replace(/^\//, ""), "index.html");
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, page);
  console.log(`prerender ${url}`);
}

const origin = "https://www.example.com";
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((url) => `  <url><loc>${origin}${url}</loc></url>`).join("\n")}
</urlset>
`;
writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
