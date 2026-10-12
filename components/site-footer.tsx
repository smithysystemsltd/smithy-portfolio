import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="eyebrow">Smithy Systems / Nairobi</p>
          <h2>Build what moves business forward.</h2>
        </div>
        <div className="footer-links">
          <div>
            <p className="footer-label">Explore</p>
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/portfolio">Portfolio</Link>
          </div>
          <div>
            <p className="footer-label">Connect</p>
            <a href={`mailto:${siteConfig.businessEmail}`}>{siteConfig.businessEmail}</a>
            <a href={`tel:${siteConfig.phone.tel}`}>{siteConfig.phone.display}</a>
            <a href={siteConfig.whatsapp.url} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            {siteConfig.socialUrls.linkedin && (
              <a href={siteConfig.socialUrls.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
            {siteConfig.socialUrls.github && (
              <a href={siteConfig.socialUrls.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>{siteConfig.location}</span>
        <Link href="/contact">Say hello <ArrowUpRight size={15} /></Link>
      </div>
    </footer>
  )
}
