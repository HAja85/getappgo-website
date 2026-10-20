import type { SVGProps } from "react";

// Stroke icons drawn for this project (24px grid, 2px stroke, round caps).
const paths = {
  layers: "M12 3 2 8l10 5 10-5-10-5Z M2 13l10 5 10-5 M2 17.5l10 5 10-5",
  users: "M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20 M10 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z M20 20v-1.5a3.5 3.5 0 0 0-2.5-3.35 M15.5 4.6a3.5 3.5 0 0 1 0 6.8",
  headset: "M4 14v-2a8 8 0 0 1 16 0v2 M4 14a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2v-2Z M20 14a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2Z M18 18a4 4 0 0 1-4 3h-2",
  building: "M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16 M16 9h2a2 2 0 0 1 2 2v10 M2 21h20 M8 7h4 M8 11h4 M8 15h4",
  cart: "M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6 M9.5 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z M17.5 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  tree: "M12 3v4 M12 7H6v4 M12 7h6v4 M6 11H4v3h4v-3H6 M18 11h-2v3h4v-3h-2 M12 7v10 M10 17h4v4h-4z",
  sparkles: "M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3Z M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z M5 3l.6 1.4L7 5l-1.4.6L5 7l-.6-1.4L3 5l1.4-.6L5 3Z",
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z",
  chart: "M3 3v18h18 M7 15l4-5 3 3 5-6",
  wave: "M3 12h1 M7 8v8 M11 5v14 M15 9v6 M19 7v10 M22 12h-1",
  code: "M8 7l-5 5 5 5 M16 7l5 5-5 5 M14 4l-4 16",
  laptop: "M4 5h16v10H4z M2 19h20 M9 19l.5-2h5l.5 2",
  server: "M3 4h18v6H3z M3 14h18v6H3z M7 7h.01 M7 17h.01 M11 7h6 M11 17h6",
  wifi: "M2 8.8a15 15 0 0 1 20 0 M5 12.5a10 10 0 0 1 14 0 M8.5 16a5 5 0 0 1 7 0 M12 20h.01",
  printer: "M6 9V3h12v6 M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2 M6 14h12v7H6z",
  monitor: "M3 4h18v12H3z M8 21h8 M12 16v5",
  refresh: "M21 12a9 9 0 0 1-15.4 6.4L3 16 M3 12a9 9 0 0 1 15.4-6.4L21 8 M21 3v5h-5 M3 21v-5h5",
  plug: "M9 2v6 M15 2v6 M6 8h12v4a6 6 0 0 1-12 0V8Z M12 18v4",
  workflow: "M3 3h7v7H3z M14 14h7v7h-7z M6.5 10v4a3 3 0 0 0 3 3H14",
  zap: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
  globe: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z M2 12h20 M12 2a15 15 0 0 1 0 20 M12 2a15 15 0 0 0 0 20",
  check: "M20 6 9 17l-5-5",
  checkCircle: "M22 11.1V12a10 10 0 1 1-5.9-9.1 M22 4 12 14l-3-3",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  grid: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
  mail: "M3 5h18v14H3z M3 6l9 7 9-7",
  linkedin: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  whatsapp: "M3 21l1.65-3.8A9 9 0 1 1 8.3 20.3L3 21 M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1",
  arrowRight: "M5 12h14 M13 6l6 6-6 6",
  arrowUp: "M12 19V5 M6 11l6-6 6 6",
  arrowUpRight: "M7 17 17 7 M8 7h9v9",
  chevronDown: "m6 9 6 6 6-6",
  chevronLeft: "m15 18-6-6 6-6",
  chevronRight: "m9 18 6-6-6-6",
  chevronsRight: "m6 17 5-5-5-5 M13 17l5-5-5-5",
  send: "M22 2 11 13 M22 2l-7 20-4-9-9-4 20-7Z",
  menu: "M4 6h16 M4 12h16 M4 18h16",
  x: "M18 6 6 18 M6 6l12 12",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z M12 6v6l4 2",
  alert: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z M12 8v4 M12 16h.01",
  inbox: "M22 12h-6l-2 3h-4l-2-3H2 M5.5 5h13L22 12v7H2v-7l3.5-7Z",
  database: "M12 8c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3Z M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  filter: "M22 3H2l8 9.5V19l4 2v-8.5L22 3Z",
  smartphone: "M7 2h10v20H7z M12 18h.01",
  brain: "M12 5a3 3 0 1 0-6 .1 4 4 0 0 0-2.5 5.8A4 4 0 0 0 6 18a4 4 0 0 0 6 1 M12 5a3 3 0 1 1 6 .1 4 4 0 0 1 2.5 5.8A4 4 0 0 1 18 18a4 4 0 0 1-6 1 M12 5v14",
} as const;

export type IconName = keyof typeof paths;

type IconProps = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

export function Icon({ name, size = 20, strokeWidth = 2, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
