import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { caseStudies, isCaseStudyPublishable, publishedCaseStudies } from "@/app/data/case-studies"
import { portfolioContent } from "@/app/data/portfolio-content"
import { BreadcrumbStructuredData } from "@/components/seo-structured-data"
import { ProjectCard } from "@/components/project-card"
import { ProjectVisual } from "@/components/project-visual"
import { createPageMetadata } from "@/config/metadata"

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return publishedCaseStudies.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const study = caseStudies.find((item) => item.slug === slug && isCaseStudyPublishable(item))
  if (!study) notFound()

  const titleBase = `${study.title} | Product Case Study | Smithy Systems`
  const title = titleBase.length < 50 ? `${titleBase} | Nairobi` : titleBase
  const description = `Explore the ${study.title} case study from Smithy Systems, covering the project challenge, work delivered, and client-approved outcomes from Nairobi.`

  return createPageMetadata({
    title,
    description,
    path: `/portfolio/${study.slug}/`,
  })
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const study = caseStudies.find((item) => item.slug === slug && isCaseStudyPublishable(item))

  if (!study) notFound()

  const relatedStudies = publishedCaseStudies.filter((item) => item.slug !== study.slug)
  const image = study.coverImage

  return (
    <>
      <BreadcrumbStructuredData items={[
        { name: "Home", path: "/" },
        { name: "Portfolio", path: "/portfolio/" },
        { name: study.title, path: `/portfolio/${study.slug}/` },
      ]} />
      <main>
      <section className="page-intro case-study-intro">
        <div className="shell">
          <p className="eyebrow">{study.industry}</p>
          <h1>{study.title}</h1>
          <p>{study.summary}</p>
          <dl className="case-study-meta">
            <div><dt>Client</dt><dd>{study.client}</dd></div>
            <div><dt>Industry</dt><dd>{study.industry}</dd></div>
            <div><dt>Services</dt><dd>{study.servicesProvided.join(", ")}</dd></div>
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="shell case-study-content">
          <ProjectVisual
            image={image}
            priority
            sizes="(max-width: 760px) 100vw, 900px"
            className="case-study-feature"
          />

          <section className="case-study-section">
            <p className="eyebrow">01 / Context</p>
            <h2>{portfolioContent.problemHeading}</h2>
            <p>{study.challenge}</p>
          </section>

          <section className="case-study-section">
            <p className="eyebrow">02 / Delivery</p>
            <h2>{portfolioContent.solutionHeading}</h2>
            <p>{study.solution}</p>
          </section>

          <section className="case-study-section">
            <p className="eyebrow">03 / Outcome</p>
            <h2>{portfolioContent.resultsHeading}</h2>
            {study.results.length > 0 ? (
              <div className="case-study-results">
                {study.results.map((result) => (
                  <div className="case-study-result" key={`${result.metric}-${result.label}`}>
                    <strong>{result.metric}</strong>
                    <span>{result.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>{portfolioContent.resultsUnavailable}</p>
            )}
          </section>

          <section className="case-study-details">
            <div>
              <p className="eyebrow">04 / Delivery notes</p>
              <h2>{portfolioContent.detailsHeading}</h2>
            </div>
            <dl>
              <div><dt>Tech stack</dt><dd>{study.techStack.join(", ")}</dd></div>
              <div><dt>Timeline</dt><dd>{study.timeline}</dd></div>
            </dl>
          </section>

          <div className="case-study-cta">
            <Link
              className="button button-dark"
              href={`/contact?service=${encodeURIComponent(study.contactService)}`}
            >
              {portfolioContent.similarProjectCta}
            </Link>
            {study.liveUrl && (
              <a className="button button-outline" href={study.liveUrl} target="_blank" rel="noopener noreferrer">
                {portfolioContent.liveProjectLink}
              </a>
            )}
          </div>
        </div>
      </section>

      {relatedStudies.length > 0 && (
        <section className="section section-tint">
          <div className="shell">
            <div className="section-heading"><h2>{portfolioContent.relatedHeading}</h2></div>
            <div className="work-grid portfolio-grid project-grid">
              {relatedStudies.slice(0, 3).map((related) => (
                <ProjectCard key={related.slug} project={related} />
              ))}
            </div>
          </div>
        </section>
      )}
      </main>
    </>
  )
}
