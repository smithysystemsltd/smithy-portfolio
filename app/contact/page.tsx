import { ContactForm } from "@/app/contact/contact-form"
import { contactFormContent, getProjectTypeFromService } from "@/app/data/contact"
import { siteConfig } from "@/config/site"

type ContactPageProps = {
  searchParams: Promise<{ service?: string | string[] }>
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams
  const service = Array.isArray(params.service) ? params.service[0] : params.service
  return (
    <main>
      <section className="page-intro">
        <div className="shell">
          <p className="eyebrow">Start a conversation</p>
          <h1>Tell us what you are trying to make.</h1>
          <p>No perfect brief required. A few lines about the challenge is enough to get started.</p>
        </div>
      </section>
      <section className="section">
        <div className="shell contact-grid">
          <div>
            <p className="eyebrow">Contact Smithy</p>
            <h2>Good questions welcome.</h2>
            <div className="contact-details">
              <div>
                <span>Email</span>
                <a href={`mailto:${siteConfig.businessEmail}`}>{siteConfig.businessEmail}</a>
              </div>
              <div>
                <span>Phone</span>
                <a href={`tel:${siteConfig.phone.tel}`}>{siteConfig.phone.display}</a>
              </div>
              <div>
                <span>Based in</span>
                <strong>{siteConfig.location}</strong>
              </div>
              <div>
                <span>Typical response</span>
                <strong>{siteConfig.responseTimePromise}</strong>
              </div>
            </div>
            <div className="contact-actions">
              <a
                className="button button-dark"
                href={siteConfig.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {siteConfig.whatsapp.label}
              </a>
              {siteConfig.bookingUrl && (
                <a
                  className="button button-outline"
                  href={siteConfig.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {siteConfig.bookingLabel}
                </a>
              )}
            </div>
          </div>
          <ContactForm
            contactEmail={siteConfig.businessEmail}
            initialProjectType={getProjectTypeFromService(service)}
            responseTimePromise={siteConfig.responseTimePromise}
          />
        </div>
      </section>
    </main>
  )
}
