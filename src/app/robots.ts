import type { MetadataRoute } from "next";
import { absoluteUrl, allowIndexing } from "@/lib/env";

/** Previews and the *.netlify.app address stay out of search until ALLOW_INDEXING=true (S-AC5). */
export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/styleguide"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
