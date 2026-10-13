import type { Metadata } from "next"
import type { ReactNode } from "react"
import { ClosingCta } from "@/components/closing-cta"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { OrganizationStructuredData } from "@/components/seo-structured-data"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { siteConfig } from "@/config/site"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: "Smithy Systems | Nairobi Technology Partner",
  description: "Websites, apps, and digital systems designed and built by Smithy Systems, a Nairobi technology partner serving businesses worldwide.",
  icons: {
    icon: "/images/logos/smithyfavicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: siteConfig.name,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <OrganizationStructuredData />
        <SiteHeader />
        {children}
        <ClosingCta />
        <SiteFooter />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
