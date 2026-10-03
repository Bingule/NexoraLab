import type { CSSProperties } from "react";
const paths: Record<string, string> = {
  arrow: "M4 12h15m-6-6 6 6-6 6",
  external: "M14 3h7v7m0-7L10 14M10 3H4v17h17v-6",
  search: "M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
  box: "m12 3 9 5v9l-9 5-9-5V8l9-5ZM3 8l9 5 9-5m-9 5v9m-4-17 9 5",
  activity: "M2 12h5l3-8 4 16 3-8h5",
  chart: "M3 3v18h18M5 17l4-6 4 3 6-9",
  layers: "m12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 16l10 5 10-5",
  cpu: "M6 6h12v12H6zM9 9h6v6H9zM9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4",
  code: "m8 5-7 7 7 7m8-14 7 7-7 7m-3-16-2 18",
  battery: "M3 6h16v12H3zM19 10h3v4h-3M7 9v6m5-6v6",
  microscope: "m9 3 5 2-3 7-5-2 3-7Zm2 9c8 0 9 8 3 8H4m0 0v2h16M4 16h7",
  download: "M12 3v12m-5-5 5 5 5-5M3 16v5h18v-5",
  globe:
    "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c-5 5-5 13 0 18 5-5 5-13 0-18",
  book: "M12 5c-3-2-7-2-10-1v16c3-1 7-1 10 1m0-16c3-2 7-2 10-1v16c-3-1-7-1-10 1V5",
  check: "m5 12 4 4L20 5",
  chevron: "m9 5 7 7-7 7",
  menu: "M3 6h18M3 12h18M3 18h18",
  close: "m6 6 12 12M6 18 18 6",
};
export const categoryIcon: Record<string, string> = {
  structure: "box",
  diffraction: "chart",
  microscopy: "microscope",
  electrochemistry: "activity",
  simulation: "cpu",
  utilities: "code",
};
export function Icon({
  name,
  size = 20,
  style,
}: {
  name: string;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      aria-hidden="true"
    >
      <path d={paths[name] || paths.box} />
    </svg>
  );
}
