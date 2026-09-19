import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const products = JSON.parse(readFileSync("src/content/products.json", "utf8")).products;
const industries = JSON.parse(readFileSync("src/content/industries.json", "utf8")).industries;

mkdirSync("public/images/products", { recursive: true });
mkdirSync("public/images/industries", { recursive: true });
mkdirSync("public/images/og", { recursive: true });
mkdirSync("public/images/brand", { recursive: true });

function svg(title, hue) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" fill="none">
  <rect width="1200" height="800" fill="#120E1F"/>
  <circle cx="380" cy="260" r="220" fill="hsla(${hue},70%,62%,0.28)"/>
  <circle cx="860" cy="520" r="260" fill="hsla(${(hue + 40) % 360},75%,55%,0.22)"/>
  <rect x="180" y="180" width="840" height="440" rx="48" stroke="rgba(239,234,252,0.18)" stroke-width="2"/>
  <text x="600" y="410" text-anchor="middle" fill="#EFEAFC" font-family="Outfit, Inter, sans-serif" font-size="42" font-weight="600">${title}</text>
</svg>`;
}

for (const [index, product] of products.entries()) {
  writeFileSync(`public/images/products/${product.slug}.svg`, svg(product.name, 250 + index * 18));
}
for (const [index, industry] of industries.entries()) {
  writeFileSync(`public/images/industries/${industry.slug}.svg`, svg(industry.name, 220 + index * 16));
}
writeFileSync("public/images/og/default.svg", svg("GetAppGo", 255));
writeFileSync(
  "public/images/brand/mark.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="16" fill="#8B7CFF"/><path d="M10 18.5 13.2 22 22 12" stroke="white" stroke-width="2.2" stroke-linecap="round"/></svg>`,
);
writeFileSync(
  "public/images/brand/wordmark.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 32"><text x="0" y="24" fill="#EFEAFC" font-family="Outfit, sans-serif" font-size="24" font-weight="600">GetAppGo</text></svg>`,
);
console.log("svgs-written", products.length, industries.length);
