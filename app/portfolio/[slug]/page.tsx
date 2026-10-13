import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { caseStudies, isCaseStudyPublishable, portfolioContent, publishedCaseStudies } from "@/app/data/case-studies"

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return publishedCaseStudies.map(({ slug }) => ({ slug }))
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const study = caseStudies.find((item) => item.slug === slug && isCaseStudyPublishable(item))

  if (!study) notFound()

  const relatedStudies = publishedCaseStudies.filter((item) => item.slug !== study.slug)
  const image = study.images[0]

  return (
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
          <div className="case-study-feature">
            {image ? (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(max-width: 760px) 100vw, 1180px"
              />
            ) : (
              <div className="work-card-placeholder">
                <span>{portfolioContent.previewPlaceholder}</span>
              </div>
            )}
          </div>

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
            <div className="work-grid portfolio-grid">
              {relatedStudies.slice(0, 3).map((related) => (
                <article className="work-card portfolio-card" key={related.slug}>
                  <Link href={`/portfolio/${related.slug}`} className="related-project-link">
                    <span className="work-meta">{related.industry}</span>
                    <h3>{related.title}</h3>
                    <p>{related.summary}</p>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
