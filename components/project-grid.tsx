import type { PortfolioProject } from "@/app/data/case-studies"
import { ProjectCard } from "@/components/project-card"

export function ProjectGrid({ projects }: { projects: PortfolioProject[] }) {
  return (
    <div className="portfolio-grid project-grid" id="portfolio-project-grid">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}
