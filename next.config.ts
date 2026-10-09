import type { NextConfig } from "next";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const isVercel = process.env.VERCEL === "1";
if (isVercel && basePath) {
  throw new Error(
    "Vercel deploys at the site root. Clear NEXT_PUBLIC_BASE_PATH.",
  );
}
const config: NextConfig = {
  // Preserve the existing site until the verified Vercel cutover.
  // Native Next.js on Vercel supports future server-side Auth callbacks.
  output: isVercel ? undefined : "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
};
export default config;
