import type { Metadata } from "next"
import type { ReactNode } from "react"
import { ClosingCta } from "@/components/closing-cta"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import "./globals.css"

export const metadata: Metadata = {
  title: "Smithy Systems | Built close. Built to last.",
  description: "Smithy Systems builds thoughtful websites, apps, and digital systems for ambitious teams.",
  icons: {
    icon: "/images/logos/smithyfavicon.png",
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <ClosingCta />
        <SiteFooter />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
