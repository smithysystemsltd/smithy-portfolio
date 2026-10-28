import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { PortfolioProject } from "@/app/data/case-studies"
import { portfolioContent } from "@/app/data/portfolio-content"
import { ProjectVisual } from "@/components/project-visual"

type FeaturedProjectProps = {
  project: PortfolioProject
}

export function FeaturedProject({ project }: FeaturedProjectProps) {
  const content = (
    <>
      <ProjectVisual
        image={project.coverImage}
        sizes="(max-width: 760px) 100vw, 58vw"
        priority
        className="featured-project-visual"
      />
      <div className="featured-project-copy">
        <span className="work-meta">{project.industry}</span>
        <h2 id="featured-project-heading">{project.title}</h2>
        <p>{project.outcome}</p>
        {project.status === "published" ? (
          <span className="featured-project-link">
            {portfolioContent.caseStudyLinkLabel} <ArrowUpRight size={18} aria-hidden="true" />
          </span>
        ) : (
          <span className="project-status">{portfolioContent.unpublishedLabel}</span>
        )}
      </div>
    </>
  )

  return (
    <section className="featured-project-section" aria-labelledby="featured-project-heading">
      <div className="shell">
        <p className="eyebrow">Featured work</p>
        {project.status === "published" ? (
          <Link
            className="featured-project"
            href={`/portfolio/${project.slug}/`}
            aria-labelledby="featured-project-heading"
          >
            {content}
          </Link>
        ) : (
          <article className="featured-project featured-project-coming-soon">
            {content}
          </article>
        )}
      </div>
    </section>
  )
}
