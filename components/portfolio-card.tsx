import Image from "next/image"
import Link from "next/link"
import {
  isCaseStudyPublishable,
  portfolioContent,
  type CaseStudy,
} from "@/app/data/case-studies"

export function PortfolioCard({ study }: { study: CaseStudy }) {
  const isPublished = isCaseStudyPublishable(study)
  const card = (
    <>
      <div className="work-card-visual">
        {study.images[0] ? (
          <Image
            className="work-card-image"
            src={study.images[0].src}
            alt={study.images[0].alt}
            fill
            sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
          />
        ) : (
          <div className="work-card-placeholder" aria-label={portfolioContent.previewPlaceholder}>
            <span>{study.title}</span>
          </div>
        )}
      </div>
      <div className="work-card-copy">
        <span className="work-meta">{study.industry}</span>
        <h3>{study.title}</h3>
        <p>{study.summary}</p>
        <span className="work-card-link">
          {isPublished
            ? portfolioContent.caseStudyLinkLabel
            : portfolioContent.unpublishedLabel}
        </span>
      </div>
    </>
  )

  return isPublished ? (
    <Link className="work-card portfolio-card" href={`/portfolio/${study.slug}`}>
      {card}
    </Link>
  ) : (
    <article className="work-card portfolio-card">
      {card}
    </article>
  )
}
