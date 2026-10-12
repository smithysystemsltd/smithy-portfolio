import Link from "next/link"
import { serviceEnquiryLinkLabel, services } from "@/app/data/services"

export default function ServicesPage() {
  return (
    <main>
      <section className="page-intro">
        <div className="shell">
          <p className="eyebrow">Capabilities</p>
          <h1>From first thought to useful thing.</h1>
          <p>Bring us the messy brief, the half-formed idea, or the product that needs a sharper second act.</p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.number}>
                <span className="service-number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <p className="work-meta">{service.tags}</p>
                <Link
                  className="service-cta"
                  href={`/contact?service=${service.enquiryService}`}
                >
                  {serviceEnquiryLinkLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
