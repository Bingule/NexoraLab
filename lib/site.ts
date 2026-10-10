import type { Metadata } from "next";

export const siteDescription =
  "AimatraLab offers materials research software for CIF crystal descriptions, scientific calculations, electrochemical data analysis and AI-assisted manuscript review.";
export const siteTitle = "AimatraLab | Materials Research Software & AI Tools";
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
      locale: "zh_CN",
      alternateLocale: "en_US",
    },
    twitter: { card: "summary", title: fullTitle, description },
  };
}
