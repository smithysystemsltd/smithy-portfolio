import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, MoveRight } from "lucide-react"
import { caseStudies, caseStudyIndustries } from "@/app/data/case-studies"
import { homepageContent } from "@/app/data/homepage"
import { ProjectCard } from "@/components/project-card"
import { createPageMetadata } from "@/config/metadata"
import { pageSeo } from "@/app/data/seo"

export const metadata: Metadata = createPageMetadata(pageSeo.home)

export default function HomePage() {
  const { hero, whoWeHelp, services, selectedWork, differentiator } = homepageContent

  return (
    <main>
      <section className="hero">
        <div className="shell">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p className="hero-copy">{hero.supportingCopy}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/contact">
              {hero.primaryCta} <ArrowUpRight size={17} />
            </Link>
            <Link className="button button-light" href="/portfolio">
              {hero.secondaryCta} <MoveRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="who-we-help" aria-labelledby="who-we-help-title">
        <div className="shell who-we-help-inner">
          <div>
            <p className="eyebrow">{whoWeHelp.eyebrow}</p>
            <h2 id="who-we-help-title">{whoWeHelp.title}</h2>
          </div>
          <ul className="industry-list">
            {caseStudyIndustries.map((industry) => <li key={industry}>{industry}</li>)}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="services-overview-title">
        <div className="shell">
          <div className="section-heading">
            <h2 id="services-overview-title">{services.heading}</h2>
            <p>{services.introduction}</p>
          </div>
          <div className="services-grid">
            {services.items.map((service) => (
              <article className="service-card" key={service.number}>
                <span className="service-number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
          <div className="section-cta">
            <Link className="button button-dark" href="/contact?service=Not%20sure%20yet">
              {services.cta} <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="selected-work-title">
        <div className="shell">
          <div className="section-heading">
            <h2 id="selected-work-title">{selectedWork.heading}</h2>
          </div>
          <div className="work-grid portfolio-grid">
            {caseStudies.slice(0, 3).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="section-cta">
            <Link className="button button-dark" href="/portfolio">
              {selectedWork.cta} <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section differentiator-section">
        <div className="shell split">
          <div>
            <p className="eyebrow">{differentiator.eyebrow}</p>
            <h2>{differentiator.title}</h2>
            <p className="hero-brand-line">{differentiator.brandLine}</p>
          </div>
          <div>
            <p>{differentiator.copy}</p>
            <Link className="button button-dark" href="/about">
              {differentiator.cta} <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
