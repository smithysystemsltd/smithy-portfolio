import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { services, servicesPageContent } from "@/app/data/services"
import { pageSeo } from "@/app/data/seo"
import { BreadcrumbStructuredData } from "@/components/seo-structured-data"
import { siteConfig } from "@/config/site"
import { createPageMetadata } from "@/config/metadata"

export const metadata = createPageMetadata(pageSeo.services)

export default function ServicesPage() {
  const { introduction, servicesHeading, servicesIntroduction, howWeWork, engagementOptions, unsure } =
    servicesPageContent

  return (
    <>
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "Services", path: pageSeo.services.path }]} />
      <main>
      <section className="page-intro">
        <div className="shell">
          <p className="eyebrow">{introduction.eyebrow}</p>
          <h1>{introduction.title}</h1>
          <p>{introduction.description}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="services-heading">
        <div className="shell">
          <div className="section-heading">
            <div>
              <h2 id="services-heading">{servicesHeading}</h2>
              <p>{servicesIntroduction}</p>
            </div>
          </div>
          <div className="services-list">
            {services.map((service) => (
              <article className="service-offering" key={service.number}>
                <div className="service-offering-heading">
                  <span className="service-number">{service.number}</span>
                  <h3>{service.title}</h3>
                </div>
                <div className="service-offering-content">
                  <div className="service-offering-details">
                    <div>
                      <h4>Who it’s for</h4>
                      <p>{service.whoFor}</p>
                    </div>
                    <div>
                      <h4>What you get</h4>
                      <ul>
                        {service.deliverables.map((deliverable) => (
                          <li key={deliverable}>{deliverable}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="service-offering-meta">
                    <p>
                      <strong>Typical timeline</strong>
                      <span>{service.timelineRange}</span>
                      <small>{service.timelineStatus}</small>
                    </p>
                    <p>
                      <strong>Tools and focus</strong>
                      <span>{service.tags}</span>
                    </p>
                    <Link
                      className="button button-dark service-offering-cta"
                      href={`/contact?service=${encodeURIComponent(service.enquiryService)}`}
                    >
                      {service.ctaLabel} <ArrowUpRight size={17} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="how-we-work-heading">
        <div className="shell">
          <div className="section-heading">
            <div>
              <h2 id="how-we-work-heading">{howWeWork.heading}</h2>
              <p>{howWeWork.introduction}</p>
            </div>
          </div>
          <ol className="process-grid">
            {howWeWork.steps.map((step, index) => (
              <li className="process-card" key={step.title}>
                <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <p className="process-expectation">{step.expectation}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="engagement-heading">
        <div className="shell">
          <div className="section-heading">
            <h2 id="engagement-heading">{engagementOptions.heading}</h2>
          </div>
          <div className="engagement-grid">
            {engagementOptions.options.map((option) => (
              <article className="engagement-card" key={option.title}>
                <h3>{option.title}</h3>
                <p><strong>Best suited to</strong>{option.suitedTo}</p>
                <p><strong>How it works</strong>{option.approach}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="unsure-heading">
        <div className="shell unsure-service-block">
          <div>
            <p className="eyebrow">{unsure.eyebrow}</p>
            <h2 id="unsure-heading">{unsure.heading}</h2>
            <p>{unsure.description}</p>
          </div>
          <div className="unsure-service-actions">
            <Link className="button button-dark" href="/contact">
              {unsure.contactCta} <ArrowUpRight size={17} />
            </Link>
            {siteConfig.bookingUrl && (
              <a
                className="button button-outline"
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {unsure.bookingCta}
              </a>
            )}
          </div>
        </div>
      </section>
      </main>
    </>
  )
}
