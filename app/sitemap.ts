import type { MetadataRoute } from "next"
import { publishedCaseStudies } from "@/app/data/case-studies"
import { siteConfig } from "@/config/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...["/", "/about/", "/services/", "/portfolio/", "/contact/"].map((path) => ({
      url: `${siteConfig.siteUrl}${path}`,
      changeFrequency: "monthly" as const,
    })),
    ...publishedCaseStudies.map((study) => ({
      url: `${siteConfig.siteUrl}/portfolio/${study.slug}/`,
      changeFrequency: "monthly" as const,
    })),
  ]
}
