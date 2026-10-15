import localFont from "next/font/local";

/** Brand fonts, self-hosted (SIL Open Font License). BRD §6.4. */
export const cormorant = localFont({
  src: [{ path: "../fonts/cormorant-garamond-latin-600-normal.woff2", weight: "600", style: "normal" }],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const familjen = localFont({
  src: [
    { path: "../fonts/familjen-grotesk-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/familjen-grotesk-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/familjen-grotesk-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-familjen",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

export const lexendGiga = localFont({
  src: [{ path: "../fonts/lexend-giga-latin-500-normal.woff2", weight: "500", style: "normal" }],
  variable: "--font-lexend-giga",
  display: "swap",
  preload: false,
  fallback: ["Arial", "sans-serif"],
});
