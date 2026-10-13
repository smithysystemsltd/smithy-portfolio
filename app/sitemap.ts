import type { MetadataRoute } from "next"
import { publishedCaseStudies } from "@/app/data/case-studies"

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://smithysystems.vercel.app").replace(/\/+$/, "")

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...["/", "/about/", "/services/", "/portfolio/", "/contact/"].map((path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: "monthly" as const,
    })),
    ...publishedCaseStudies.map((study) => ({
      url: `${siteUrl}/portfolio/${study.slug}/`,
      changeFrequency: "monthly" as const,
    })),
  ]
}
