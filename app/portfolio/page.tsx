import { caseStudies, caseStudyIndustries, publishedCaseStudies } from "@/app/data/case-studies"
import { pageSeo } from "@/app/data/seo"
import { PortfolioHero } from "@/components/portfolio-hero"
import { PortfolioProjects } from "@/app/portfolio/portfolio-projects"
import { TrustedBy } from "@/components/trusted-by"
import {
  BreadcrumbStructuredData,
  PortfolioStructuredData,
} from "@/components/seo-structured-data"
import { createPageMetadata } from "@/config/metadata"

export const metadata = createPageMetadata(pageSeo.portfolio)

type PortfolioPageProps = {
  searchParams: Promise<{ industry?: string | string[] }>
}

function industrySlug(industry: string) {
  return industry.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const params = await searchParams
  const requestedIndustry = Array.isArray(params.industry)
    ? params.industry[0]
    : params.industry
  const availableIndustries = new Set(caseStudyIndustries.map(industrySlug))
  const initialIndustry =
    requestedIndustry && availableIndustries.has(requestedIndustry)
      ? requestedIndustry
      : "all"
  const projects = caseStudies.map((project) => ({
    slug: project.slug,
    title: project.title,
    industry: project.industry,
    summary: project.summary,
    outcome: project.outcome,
    status: project.status,
    coverImage: project.coverImage,
    tags: project.tags,
    year: project.year,
  }))

  return (
    <>
      <BreadcrumbStructuredData
        items={[{ name: "Home", path: "/" }, { name: "Portfolio", path: pageSeo.portfolio.path }]}
      />
      <PortfolioStructuredData projects={publishedCaseStudies} />
      <main>
        <PortfolioHero industries={caseStudyIndustries} />
        <PortfolioProjects
          projects={projects}
          industries={caseStudyIndustries}
          initialIndustry={initialIndustry}
        />
        <TrustedBy />
      </main>
    </>
  )
}
