import type { MetadataRoute } from "next";
import { isAvailable } from "@/lib/manifest";
import { getTools } from "@/lib/registry";
import { rateViews } from "@/lib/migrated-tools";
import { siteHref } from "@/lib/site";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const tools = getTools().filter(isAvailable);
  return [
    "/",
    "/tools/",
    "/lab/",
    "/research/",
    "/about/",
    ...tools.map((tool) => `/tools/${tool.id}/`),
    ...tools
      .filter((tool) => tool.type !== "desktop")
      .map((tool) => `/lab/${tool.id}/`),
    ...rateViews.map((view) => `/lab/rate-performance/${view}/`),
  ].map((path) => ({ url: siteHref(path) }));
}
