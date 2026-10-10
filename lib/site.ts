import type { Metadata } from "next";

export const siteDescription =
  "AimatraLab develops practical tools for materials research, characterization, simulation, data analysis and scientific visualization.";
export const siteTitle =
  "AimatraLab — AI-assisted Tools for Materials Research";
// Use the custom domain when configured, otherwise Vercel's production host.
// Preserve the current site outside Vercel until cutover.
const vercelHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
export const siteUrl = new URL(
  `${(process.env.NEXT_PUBLIC_SITE_URL || (vercelHost ? `https://${vercelHost}` : "https://aimatralab.com")).replace(/\/$/, "")}/`,
);

export function siteHref(path: string) {
  return new URL(path.replace(/^\//, ""), siteUrl).href;
}

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const url = siteHref(path);
  const fullTitle = title ? `${title} | AimatraLab` : siteTitle;
  return {
    title: title || siteTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: "AimatraLab",
      title: fullTitle,
      description,
      url,
      locale: "en_US",
      alternateLocale: "zh_CN",
    },
    twitter: { card: "summary", title: fullTitle, description },
  };
}
