import type { Metadata } from "next"
import { siteConfig } from "@/config/site"

type PageSeo = {
  title: string
  description: string
  path?: string
}

export function createPageMetadata(page: PageSeo): Metadata {
  const canonical = page.path ? `${siteConfig.siteUrl}${page.path}` : undefined
  const image = {
    url: `${siteConfig.siteUrl}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: "Smithy Systems — Websites, apps and business systems for global businesses",
  }

  return {
    title: page.title,
    description: page.description,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      type: "website",
      locale: "en_KE",
      siteName: siteConfig.name,
      title: page.title,
      description: page.description,
      ...(canonical ? { url: canonical } : {}),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image],
    },
  }
}
