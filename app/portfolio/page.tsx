import Image from "next/image"
import { PortfolioProjects } from "@/app/portfolio/portfolio-projects"
import { pageSeo } from "@/app/data/seo"
import { BreadcrumbStructuredData } from "@/components/seo-structured-data"
import { createPageMetadata } from "@/config/metadata"

const projects = [
  ["01", "Kijani Market", "Commerce / Product", "A flexible commerce experience giving a Kenyan lifestyle brand room to move."],
  ["02", "Afya Connect", "Health / Platform", "A patient-first digital product making care feel more connected."],
  ["03", "Mara Logistics", "Operations / Systems", "A clear operating system for a logistics team managing more complexity."],
  ["04", "Tangaza Learning", "Education / Web", "A learning platform designed around access, attention, and progress."],
  ["05", "Safi Living", "Wellness / Brand", "A new digital home for an East African wellness company with a lot to say."],
  ["06", "Savanna Ops", "Agriculture / Systems", "One calm view across the moving parts of a growing agri-business."],
]

export const metadata = createPageMetadata(pageSeo.portfolio)

const partners = [
  {
    name: "Favor Brands",
    website: "https://favorbrands.co.ke",
    logo: "/images/partners/favorbrands.png",
  },
]

export default function PortfolioPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "Portfolio", path: pageSeo.portfolio.path }]} />
      <main>
      <section className="partner-section">
        <div className="partner-heading">
          <div className="shell partner-heading-inner">
            <div>
              <p className="eyebrow">Good work is built together</p>
              <h1>Selected partners</h1>
            </div>
            <p>A few of the teams we’ve partnered with to bring their websites to life.</p>
          </div>
        </div>
        <div className="section partner-content">
          <div className="shell">
          <div className="partner-grid">
            {partners.map((partner) => (
              <a
                className="partner-card"
                href={partner.website}
                key={partner.name}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${partner.name} website (opens in a new tab)`}
              >
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={290}
                  height={71}
                  className="partner-logo"
                />
                <span className="partner-card-copy">
                  <strong>{partner.name}</strong>
                  <span className="partner-website">
                    Visit website <span aria-hidden="true">↗</span>
                  </span>
                </span>
              </a>
            ))}
          </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell" aria-labelledby="portfolio-projects-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Case studies</p>
              <h2 id="portfolio-projects-heading">Selected work</h2>
            </div>
            <p>A closer look at the challenges, solutions, and outcomes behind our projects.</p>
          </div>
          <PortfolioProjects />
        </div>
      </section>
      </main>
    </>
  )
}
