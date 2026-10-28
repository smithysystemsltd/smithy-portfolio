"use client"

import { useState } from "react"
import {
  caseStudyIndustries,
  caseStudies,
  portfolioContent,
} from "@/app/data/case-studies"
import { PortfolioCard } from "@/components/portfolio-card"

const projectsPerPage = 3

export function PortfolioProjects() {
  const [activeIndustry, setActiveIndustry] = useState("all")
  const [visibleCount, setVisibleCount] = useState(projectsPerPage)
  const industries = [
    { value: "all", label: portfolioContent.allIndustriesLabel },
    ...caseStudyIndustries.map((industry) => ({ value: industry, label: industry })),
  ]
  const visibleStudies = caseStudies.filter(
    (study) => activeIndustry === "all" || study.industry === activeIndustry,
  )
  const displayedStudies = visibleStudies.slice(0, visibleCount)
  const remainingCount = visibleStudies.length - displayedStudies.length

  return (
    <>
      <div className="portfolio-filters" role="group" aria-label={portfolioContent.filterLabel}>
        {industries.map((industry) => (
          <button
            className="portfolio-filter"
            key={industry.value}
            type="button"
            aria-pressed={activeIndustry === industry.value}
            onClick={() => {
              setActiveIndustry(industry.value)
              setVisibleCount(projectsPerPage)
            }}
          >
            {industry.label}
          </button>
        ))}
      </div>
      <div className="work-grid portfolio-grid" id="portfolio-project-grid">
        {displayedStudies.map((study) => (
          <PortfolioCard key={study.slug} study={study} />
        ))}
      </div>
      {remainingCount > 0 && (
        <div className="portfolio-load-more">
          <button
            className="button button-dark"
            type="button"
            aria-controls="portfolio-project-grid"
            onClick={() => setVisibleCount((count) => count + projectsPerPage)}
          >
            Load more
          </button>
        </div>
      )}
    </>
  )
}
