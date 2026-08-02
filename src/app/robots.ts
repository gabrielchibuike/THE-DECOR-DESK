import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/go/", // Block search engines from crawling and indexing affiliate redirect links
        "/api/", // Block API endpoints
      ],
    },
    sitemap: "https://thedecordesk.com/sitemap.xml",
  };
}
