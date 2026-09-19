import { mkdirSync, writeFileSync } from "node:fs";

const dirs = [
  "public/images/brand",
  "public/images/products",
  "public/images/industries",
  "public/images/solutions",
  "public/images/categories",
  "public/images/graphics",
  "public/images/icons",
  "public/images/og",
];
for (const dir of dirs) mkdirSync(dir, { recursive: true });

const ink = "#0C0A14";
const panel = "#161225";
const line = "rgba(239,234,252,0.16)";
const mist = "#EFEAFC";
const muted = "#B7B0CC";
const accent = "#8B7CFF";
const glow = "#4F46E5";

function svg(inner, w = 1200, h = 800) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" fill="none">${inner}</svg>\n`;
}

function glowBg(a = accent, b = glow) {
  return `
  <rect width="1200" height="800" fill="${ink}"/>
  <circle cx="360" cy="220" r="260" fill="${a}" opacity="0.28"/>
  <circle cx="900" cy="560" r="300" fill="${b}" opacity="0.22"/>
  <rect width="1200" height="800" fill="url(#grid)" opacity="0.35"/>
  <defs>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" stroke="${mist}" stroke-opacity="0.06"/>
    </pattern>
  </defs>`;
}

function windowChrome(inner, { x = 90, y = 90, w = 1020, h = 620 } = {}) {
  return `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="28" fill="${panel}" stroke="${line}"/>
  <circle cx="${x + 28}" cy="${y + 26}" r="6" fill="#FF6B7A"/>
  <circle cx="${x + 50}" cy="${y + 26}" r="6" fill="#F5C542"/>
  <circle cx="${x + 72}" cy="${y + 26}" r="6" fill="#49D17D"/>
  <rect x="${x + 110}" y="${y + 16}" width="220" height="20" rx="10" fill="${mist}" fill-opacity="0.08"/>
  <rect x="${x + 16}" y="${y + 52}" width="188" height="${h - 68}" rx="18" fill="${ink}" fill-opacity="0.55"/>
  ${[0, 1, 2, 3, 4].map((i) => `<rect x="${x + 36}" y="${y + 78 + i * 46}" width="148" height="14" rx="7" fill="${mist}" fill-opacity="${i === 0 ? 0.28 : 0.1}"/>`).join("")}
  <g transform="translate(${x + 220} ${y + 68})">${inner}</g>`;
}

function bars(values, color = accent) {
  return values
    .map((v, i) => `<rect x="${i * 54}" y="${180 - v}" width="34" height="${v}" rx="8" fill="${color}" opacity="${0.45 + i * 0.08}"/>`)
    .join("");
}

function cards(count, cols = 3) {
  return Array.from({ length: count }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    return `<rect x="${col * 240}" y="${row * 150}" width="220" height="132" rx="18" fill="${mist}" fill-opacity="0.06" stroke="${line}"/>
      <rect x="${col * 240 + 18}" y="${row * 150 + 22}" width="120" height="10" rx="5" fill="${accent}" opacity="0.7"/>
      <rect x="${col * 240 + 18}" y="${row * 150 + 46}" width="170" height="8" rx="4" fill="${mist}" fill-opacity="0.18"/>
      <rect x="${col * 240 + 18}" y="${row * 150 + 66}" width="140" height="8" rx="4" fill="${mist}" fill-opacity="0.1"/>`;
  }).join("");
}

function nodes(pairs) {
  const dots = pairs.map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="10" fill="${accent}"/>`).join("");
  const links = pairs
    .slice(1)
    .map(([cx, cy], i) => `<line x1="${pairs[i][0]}" y1="${pairs[i][1]}" x2="${cx}" y2="${cy}" stroke="${accent}" stroke-opacity="0.45"/>`)
    .join("");
  return links + dots;
}

function waveform() {
  const d = Array.from({ length: 42 }, (_, i) => {
    const x = i * 16;
    const y = 90 + Math.sin(i / 2.2) * 38 + Math.sin(i / 5) * 18;
    return `${i === 0 ? "M" : "L"}${x} ${y}`;
  }).join(" ");
  return `<path d="${d}" stroke="${accent}" stroke-width="3" fill="none"/>`;
}

function candles() {
  return Array.from({ length: 18 }, (_, i) => {
    const h = 40 + ((i * 37) % 90);
    const y = 120 - h / 2 + (i % 2) * 12;
    return `<rect x="${i * 36}" y="${y}" width="16" height="${h}" rx="3" fill="${i % 3 === 0 ? "#49D17D" : accent}" opacity="0.85"/>
      <line x1="${i * 36 + 8}" y1="${y - 16}" x2="${i * 36 + 8}" y2="${y + h + 16}" stroke="${mist}" stroke-opacity="0.25"/>`;
  }).join("");
}

function floorplan() {
  return `
  <rect x="0" y="0" width="720" height="430" rx="20" fill="${ink}" fill-opacity="0.4" stroke="${line}"/>
  <rect x="24" y="24" width="210" height="180" rx="12" fill="${accent}" fill-opacity="0.18"/>
  <rect x="250" y="24" width="250" height="180" rx="12" fill="${mist}" fill-opacity="0.06"/>
  <rect x="520" y="24" width="176" height="382" rx="12" fill="${glow}" fill-opacity="0.18"/>
  <rect x="24" y="220" width="476" height="186" rx="12" fill="${mist}" fill-opacity="0.05"/>
  <circle cx="140" cy="110" r="8" fill="${accent}"/>
  <circle cx="610" cy="120" r="8" fill="${accent}"/>`;
}

const productScenes = {
  "ai-workforce-platform": () =>
    windowChrome(`
      <rect x="0" y="0" width="300" height="500" rx="20" fill="${ink}" fill-opacity="0.45"/>
      ${[0, 1, 2, 3, 4].map((i) => `<rect x="18" y="${20 + i * 88}" width="${i % 2 ? 220 : 250}" height="64" rx="14" fill="${mist}" fill-opacity="${i === 1 ? 0.16 : 0.07}"/>`).join("")}
      <g transform="translate(330 0)">${cards(6)}</g>
    `),
  "ai-call-center-platform": () =>
    windowChrome(`
      ${waveform()}
      <g transform="translate(0 180)">${cards(4, 2)}</g>
      <circle cx="680" cy="90" r="54" fill="${accent}" fill-opacity="0.2" stroke="${accent}"/>
      <circle cx="680" cy="90" r="10" fill="${accent}"/>
    `),
  "ai-trading-platform": () =>
    windowChrome(`
      ${candles()}
      <g transform="translate(0 260)">${bars([70, 110, 90, 140, 80, 160, 100, 130], "#49D17D")}</g>
    `),
  "erp-system": () =>
    windowChrome(`
      ${cards(6)}
      <g transform="translate(0 320)">${bars([90, 140, 110, 170, 80, 150, 120, 160])}</g>
    `),
  "crm-system": () =>
    windowChrome(
      [0, 1, 2, 3]
        .map(
          (col) => `
        <rect x="${col * 190}" y="0" width="174" height="500" rx="18" fill="${ink}" fill-opacity="0.35"/>
        ${[0, 1, 2].map((row) => `<rect x="${col * 190 + 14}" y="${20 + row * 110}" width="146" height="92" rx="14" fill="${mist}" fill-opacity="${0.08 + col * 0.03}"/>`).join("")}
      `,
        )
        .join(""),
    ),
  "facility-management-system": () => windowChrome(floorplan()),
  "helpdesk-system": () =>
    windowChrome(`
      ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="0" y="${i * 72}" width="460" height="58" rx="14" fill="${mist}" fill-opacity="${i === 0 ? 0.14 : 0.06}"/>
        <circle cx="28" cy="${i * 72 + 29}" r="8" fill="${i < 2 ? accent : muted}"/>`).join("")}
      <g transform="translate(490 0)">
        <rect width="250" height="430" rx="20" fill="${ink}" fill-opacity="0.4"/>
        <circle cx="125" cy="150" r="70" fill="none" stroke="${accent}" stroke-width="14"/>
        <circle cx="125" cy="150" r="70" fill="none" stroke="${mist}" stroke-opacity="0.15" stroke-width="14" stroke-dasharray="80 140"/>
      </g>
    `),
  "ecommerce-platform": () =>
    windowChrome(`
      ${cards(6)}
      <g transform="translate(0 330)">
        <rect width="740" height="160" rx="18" fill="${ink}" fill-opacity="0.4"/>
        ${bars([60, 120, 90, 150, 70, 180, 110, 140])}
      </g>
    `),
  "genealogy-management-system": () =>
    windowChrome(`
      ${nodes([
        [360, 40],
        [220, 140],
        [500, 140],
        [140, 260],
        [300, 260],
        [460, 260],
        [620, 260],
        [220, 400],
        [500, 400],
      ])}
    `),
  "oqtane-custom-application-development": () =>
    windowChrome(`
      ${[0, 1, 2, 3, 4].map((i) => `<rect x="0" y="${i * 92}" width="${i === 1 ? 740 : 520}" height="76" rx="16" fill="${mist}" fill-opacity="${0.05 + (i % 2) * 0.05}" stroke="${line}"/>`).join("")}
      <g transform="translate(560 184)">
        <rect width="180" height="260" rx="16" fill="${accent}" fill-opacity="0.18" stroke="${accent}"/>
        ${[0, 1, 2].map((i) => `<rect x="18" y="${24 + i * 70}" width="144" height="48" rx="10" fill="${mist}" fill-opacity="0.12"/>`).join("")}
      </g>
    `),
};

function sceneTitle(title) {
  return `<text x="600" y="770" text-anchor="middle" fill="${muted}" font-family="Outfit, Inter, sans-serif" font-size="18">${title}</text>`;
}

function productSvg(title, slug) {
  const inner = productScenes[slug]?.() ?? windowChrome(cards(6));
  return svg(`${glowBg()}${inner}${sceneTitle(title)}`);
}

function industrySvg(name, kind) {
  const motifs = {
    "enterprise-operations": bars([80, 140, 100, 180, 90, 160, 120, 150]),
    "customer-service": waveform(),
    commerce: cards(6),
    "financial-services": candles(),
    "facilities-property": floorplan(),
    "heritage-records": nodes([
      [400, 80],
      [250, 220],
      [550, 220],
      [160, 380],
      [400, 380],
      [640, 380],
    ]),
    "custom-software": cards(4, 2),
  };
  return svg(`${glowBg("#6D5CFF", glow)}
    <rect x="180" y="160" width="840" height="460" rx="36" fill="${panel}" stroke="${line}"/>
    <g transform="translate(260 220)">${motifs[kind] ?? cards(4)}</g>
    ${sceneTitle(name)}`);
}

function poster(title, motif) {
  return svg(`${glowBg()}
    <rect x="140" y="140" width="920" height="500" rx="40" fill="${panel}" stroke="${line}"/>
    <g transform="translate(240 220)">${motif}</g>
    ${sceneTitle(title)}`);
}

const markInner = `
  <rect width="64" height="64" rx="20" fill="${accent}"/>
  <path d="M45 21.5a16.5 16.5 0 1 0 0 21" stroke="white" stroke-width="4.6" stroke-linecap="round"/>
  <path d="M31 32h16" stroke="white" stroke-width="4.6" stroke-linecap="round"/>
  <path d="M42.5 26.5 49 32l-6.5 5.5" stroke="white" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>`;

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">${markInner}
</svg>
`;

const wordmark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 36" fill="none">
  <text x="0" y="26" font-family="Outfit, Inter, sans-serif" font-size="26" font-weight="600" fill="${mist}">Get</text>
  <text x="52" y="26" font-family="Outfit, Inter, sans-serif" font-size="26" font-weight="600" fill="${accent}">App</text>
  <text x="108" y="26" font-family="Outfit, Inter, sans-serif" font-size="26" font-weight="600" fill="${mist}">Go</text>
</svg>
`;

const lockup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 64" fill="none">
  <rect width="64" height="64" rx="20" fill="${accent}"/>
  <path d="M45 21.5a16.5 16.5 0 1 0 0 21" stroke="white" stroke-width="4.6" stroke-linecap="round"/>
  <path d="M31 32h16" stroke="white" stroke-width="4.6" stroke-linecap="round"/>
  <path d="M42.5 26.5 49 32l-6.5 5.5" stroke="white" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="80" y="30" font-family="Outfit, Inter, sans-serif" font-size="22" font-weight="600" fill="${mist}">Get</text>
  <text x="124" y="30" font-family="Outfit, Inter, sans-serif" font-size="22" font-weight="600" fill="${accent}">App</text>
  <text x="172" y="30" font-family="Outfit, Inter, sans-serif" font-size="22" font-weight="600" fill="${mist}">Go</text>
  <text x="80" y="50" font-family="Inter, sans-serif" font-size="11" fill="${muted}">Enterprise software + AI</text>
</svg>
`;

writeFileSync("public/images/brand/mark.svg", mark);
writeFileSync("public/images/brand/mark-on-light.svg", mark.replace(accent, "#6F5BFF"));
writeFileSync("public/images/brand/wordmark.svg", wordmark);
writeFileSync("public/images/brand/lockup.svg", lockup);
writeFileSync("public/favicon.svg", mark);
writeFileSync("public/images/brand/apple-touch.svg", mark);

writeFileSync(
  "public/images/graphics/grid.svg",
  svg(
    `<rect width="1200" height="800" fill="${ink}"/><path d="M0 0H1200M0 80H1200M0 160H1200M0 240H1200M0 320H1200M0 400H1200M0 480H1200M0 560H1200M0 640H1200M0 720H1200" stroke="${mist}" stroke-opacity="0.06"/><path d="M0 0V800M80 0V800M160 0V800M240 0V800M320 0V800M400 0V800M480 0V800M560 0V800M640 0V800M720 0V800M800 0V800M880 0V800M960 0V800M1040 0V800M1120 0V800" stroke="${mist}" stroke-opacity="0.06"/>`,
  ),
);

writeFileSync(
  "public/images/graphics/orb.svg",
  svg(
    `<defs><radialGradient id="orb" cx="50%" cy="40%"><stop offset="0%" stop-color="${accent}"/><stop offset="100%" stop-color="${ink}"/></radialGradient></defs>
    <rect width="1200" height="800" fill="${ink}"/>
    <circle cx="600" cy="400" r="240" fill="url(#orb)" opacity="0.9"/>`,
  ),
);

writeFileSync(
  "public/images/graphics/hero-collage.svg",
  svg(`${glowBg()}
    <g transform="translate(80 90) scale(0.86)">${windowChrome(cards(4), { x: 0, y: 0, w: 920, h: 520 })}</g>
    <g transform="translate(420 250) scale(0.72)">${windowChrome(waveform(), { x: 0, y: 0, w: 820, h: 420 })}</g>`),
);

writeFileSync(
  "public/images/og/default.svg",
  svg(
    `${glowBg()}
    <g transform="translate(120 230) scale(2.1)">${markInner}</g>
    <text x="300" y="340" font-family="Outfit, Inter, sans-serif" font-size="72" font-weight="600" fill="${mist}">GetAppGo</text>
    <text x="300" y="400" font-family="Inter, sans-serif" font-size="28" fill="${muted}">Enterprise software and AI platforms</text>`,
    1200,
    630,
  ),
);

const products = [
  ["ai-workforce-platform", "AI Workforce Platform"],
  ["ai-call-center-platform", "AI Call Center Platform"],
  ["ai-trading-platform", "AI Trading Platform"],
  ["erp-system", "ERP System"],
  ["crm-system", "CRM System"],
  ["facility-management-system", "Facility Management System"],
  ["helpdesk-system", "Helpdesk System"],
  ["ecommerce-platform", "Ecommerce Platform"],
  ["genealogy-management-system", "Genealogy Management System"],
  ["oqtane-custom-application-development", "Oqtane Custom Development"],
];

for (const [slug, name] of products) {
  writeFileSync(`public/images/products/${slug}.svg`, productSvg(name, slug));
}

const industries = [
  ["enterprise-operations", "Enterprise Operations"],
  ["customer-service", "Customer Service"],
  ["commerce", "Commerce"],
  ["financial-services", "Financial Services"],
  ["facilities-property", "Facilities & Property"],
  ["heritage-records", "Heritage & Records"],
  ["custom-software", "Custom Software"],
];
for (const [slug, name] of industries) {
  writeFileSync(`public/images/industries/${slug}.svg`, industrySvg(name, slug));
}

writeFileSync("public/images/solutions/intelligent-operations.svg", poster("Intelligent Operations", waveform() + `<g transform="translate(0 180)">${cards(3)}</g>`));
writeFileSync("public/images/solutions/business-systems.svg", poster("Business Systems", cards(6)));
writeFileSync("public/images/solutions/custom-development.svg", poster("Custom Development", cards(4, 2)));
writeFileSync("public/images/categories/ai-products.svg", poster("AI Products", waveform() + candles()));
writeFileSync("public/images/categories/business-software.svg", poster("Business Software", cards(6)));

const icon = (inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
  <rect width="48" height="48" rx="16" fill="${panel}" stroke="${line}"/>
  ${inner}
</svg>\n`;

writeFileSync("public/images/icons/process-1.svg", icon(`<circle cx="24" cy="24" r="10" stroke="${accent}" stroke-width="2.4"/><circle cx="24" cy="24" r="3" fill="${accent}"/>`));
writeFileSync("public/images/icons/process-2.svg", icon(`<rect x="12" y="14" width="24" height="20" rx="4" stroke="${accent}" stroke-width="2.2"/><path d="M16 20h16M16 26h10" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>`));
writeFileSync("public/images/icons/process-3.svg", icon(`<path d="M16 30 24 16l8 14" stroke="${accent}" stroke-width="2.2" stroke-linejoin="round"/><path d="M19 30h10" stroke="${accent}" stroke-width="2.2" stroke-linecap="round"/>`));
writeFileSync("public/images/icons/process-4.svg", icon(`<path d="M16 24h16" stroke="${accent}" stroke-width="2.2" stroke-linecap="round"/><path d="M28 18l6 6-6 6" stroke="${accent}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`));
writeFileSync(
  "public/images/icons/whatsapp.svg",
  icon(`<path d="M16 31.5 15 34l2.6-1.1A12 12 0 1 0 16 31.5Z" stroke="${accent}" stroke-width="2"/><path d="M19 22c.4 2.2 2.2 4.4 4.4 5.2.6.2 1.2 0 1.6-.4l1-1.2c.2-.3.1-.7-.2-.9l-1.5-1c-.3-.2-.7-.1-.9.1l-.4.5c-.2.2-.5.2-.7.1-1-.4-1.8-1.2-2.2-2.2-.1-.2 0-.5.1-.7l.5-.4c.3-.2.3-.6.1-.9l-1-1.5c-.2-.3-.6-.4-.9-.2l-1.2 1c-.4.4-.6 1-.4 1.6Z" fill="${accent}"/>`),
);
writeFileSync(
  "public/images/graphics/not-found.svg",
  svg(
    `<circle cx="400" cy="140" r="110" fill="${accent}" opacity="0.28"/>
    <g transform="translate(368 108)">${markInner}</g>
    <text x="400" y="250" text-anchor="middle" font-family="Outfit, sans-serif" font-size="64" font-weight="600" fill="${mist}">404</text>`,
    800,
    280,
  ),
);

console.log("svgs-written", products.length, industries.length);
