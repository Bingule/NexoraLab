import type { MetadataRoute } from "next";
import { siteHref } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: siteHref("/sitemap.xml"),
  };
}
