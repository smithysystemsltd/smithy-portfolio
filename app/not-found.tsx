import Link from "next/link"
import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { notFoundContent, pageSeo } from "@/app/data/seo"
import { createPageMetadata } from "@/config/metadata"

export const metadata: Metadata = createPageMetadata(pageSeo.notFound)

export default function NotFound() {
  return (
    <main>
      <section className="page-intro">
        <div className="shell">
          <p className="eyebrow">{notFoundContent.eyebrow}</p>
          <h1>{notFoundContent.heading}</h1>
          <p>{notFoundContent.description}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/contact">
              {notFoundContent.contactCta} <ArrowUpRight size={17} />
            </Link>
            <Link className="button button-light" href="/services">
              {notFoundContent.servicesCta}
            </Link>
            <Link className="button button-light" href="/portfolio">
              {notFoundContent.portfolioCta}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
