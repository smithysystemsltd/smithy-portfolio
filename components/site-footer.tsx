import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

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
            <a href="mailto:hello@smithysystems.co.ke">hello@smithysystems.co.ke</a>
            <a href="https://www.linkedin.com/">LinkedIn</a>
            <a href="https://github.com/">GitHub</a>
          </div>
        </div>
      </div>
      <div className="shell footer-bottom"><span>Nairobi, Kenya / Working across Africa</span><Link href="/contact">Say hello <ArrowUpRight size={15} /></Link></div>
    </footer>
  )
}
