import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { closingCtaContent } from "@/app/data/homepage"
import { siteConfig } from "@/config/site"

export function ClosingCta() {
  return (
    <section className="closing-cta" aria-labelledby="closing-cta-title">
      <div className="shell closing-cta-inner">
        <div>
          <p className="eyebrow">{closingCtaContent.eyebrow}</p>
          <h2 id="closing-cta-title">{closingCtaContent.headline}</h2>
          <p className="closing-cta-reassurance">
            {closingCtaContent.reassurance} {closingCtaContent.responsePrefix}{" "}
            {siteConfig.responseTimePromise.toLowerCase()}.
          </p>
        </div>
        <div className="closing-cta-actions">
          <Link className="button button-primary" href="/contact">
            {closingCtaContent.primaryCta} <ArrowUpRight size={17} />
          </Link>
          <a
            className="closing-cta-text-link"
            href={siteConfig.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {closingCtaContent.whatsappCta}
          </a>
          {siteConfig.bookingUrl && (
            <a
              className="closing-cta-text-link"
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {siteConfig.bookingLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
