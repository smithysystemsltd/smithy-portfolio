import { ContactForm } from "@/app/contact/contact-form"
import { contactFormContent, getProjectTypeFromService } from "@/app/data/contact"

type ContactPageProps = {
  searchParams: Promise<{ service?: string | string[] }>
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams
  const service = Array.isArray(params.service) ? params.service[0] : params.service
  const contactEmail = process.env.CONTACT_EMAIL || ""

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
              {contactEmail && (
                <div>
                  <span>Email</span>
                  <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                </div>
              )}
              <div>
                <span>Phone</span>
                <a className="phone-number">0799749761</a>
              </div>
              <div>
                <span>Based in</span>
                <strong>Nairobi, Kenya / Working across Africa</strong>
              </div>
              <div>
                <span>Typical response</span>
                <strong>{contactFormContent.responseTime}</strong>
              </div>
            </div>
          </div>
          <ContactForm
            contactEmail={contactEmail}
            initialProjectType={getProjectTypeFromService(service)}
          />
        </div>
      </section>
    </main>
  )
}
