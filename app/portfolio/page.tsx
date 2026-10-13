const projects = [
  ["01", "Kijani Market", "Commerce / Product", "A flexible commerce experience giving a Kenyan lifestyle brand room to move."],
  ["02", "Afya Connect", "Health / Platform", "A patient-first digital product making care feel more connected."],
  ["03", "Mara Logistics", "Operations / Systems", "A clear operating system for a logistics team managing more complexity."],
  ["04", "Tangaza Learning", "Education / Web", "A learning platform designed around access, attention, and progress."],
  ["05", "Safi Living", "Wellness / Brand", "A new digital home for an East African wellness company with a lot to say."],
  ["06", "Savanna Ops", "Agriculture / Systems", "One calm view across the moving parts of a growing agri-business."],
]

import { PortfolioProjects } from "@/app/portfolio/portfolio-projects"
import { portfolioContent } from "@/app/data/case-studies"
import { pageSeo } from "@/app/data/seo"
import { BreadcrumbStructuredData } from "@/components/seo-structured-data"
import { createPageMetadata } from "@/config/metadata"

export const metadata = createPageMetadata(pageSeo.portfolio)

export default function PortfolioPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "Portfolio", path: pageSeo.portfolio.path }]} />
      <main>
      <section className="page-intro">
        <div className="shell">
          <p className="eyebrow">Selected work</p>
          <h1>Useful, memorable, built to last.</h1>
          <p>A few collaborations across commerce, health, operations, education, and the spaces between.</p>
        </div>
      </section>
      <section className="section">
        <div className="shell" aria-labelledby="portfolio-projects-heading">
          <h2 id="portfolio-projects-heading" className="sr-only">{portfolioContent.projectsHeading}</h2>
          <PortfolioProjects />
        </div>
      </section>
      </main>
    </>
  )
}
