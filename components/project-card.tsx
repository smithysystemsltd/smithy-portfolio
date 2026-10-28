import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { PortfolioProject } from "@/app/data/case-studies"
import { portfolioContent } from "@/app/data/portfolio-content"
import { ProjectVisual } from "@/components/project-visual"

type ProjectCardProps = {
  project: PortfolioProject
}

function ProjectCardContent({ project }: ProjectCardProps) {
  const isPublished = project.status === "published"

  return (
    <>
      <ProjectVisual
        image={project.coverImage}
        sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 42vw"
      />
      <div className="project-card-copy">
        <div className="project-card-meta">
          <span className="work-meta">{project.industry}</span>
          {!isPublished && <span className="project-status">{portfolioContent.unpublishedLabel}</span>}
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        {isPublished && (
          <span className="project-card-link">
            {portfolioContent.caseStudyLinkLabel}
            <ArrowUpRight size={17} aria-hidden="true" />
          </span>
        )}
      </div>
    </>
  )
}

export function ProjectCard({ project }: ProjectCardProps) {
  return project.status === "published" ? (
    <Link className="project-card" href={`/portfolio/${project.slug}/`}>
      <ProjectCardContent project={project} />
    </Link>
  ) : (
    <article className="project-card project-card-coming-soon">
      <ProjectCardContent project={project} />
    </article>
  )
}
