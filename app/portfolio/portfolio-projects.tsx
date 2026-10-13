"use client"

import { useState } from "react"
import {
  caseStudyIndustries,
  caseStudies,
  portfolioContent,
} from "@/app/data/case-studies"
import { PortfolioCard } from "@/components/portfolio-card"

export function PortfolioProjects() {
  const [activeIndustry, setActiveIndustry] = useState("all")
  const industries = [
    { value: "all", label: portfolioContent.allIndustriesLabel },
    ...caseStudyIndustries.map((industry) => ({ value: industry, label: industry })),
  ]
  const visibleStudies = caseStudies.filter(
    (study) => activeIndustry === "all" || study.industry === activeIndustry,
  )

  return (
    <>
      <div className="portfolio-filters" role="group" aria-label={portfolioContent.filterLabel}>
        {industries.map((industry) => (
          <button
            className="portfolio-filter"
            key={industry.value}
            type="button"
            aria-pressed={activeIndustry === industry.value}
            onClick={() => setActiveIndustry(industry.value)}
          >
            {industry.label}
          </button>
        ))}
      </div>
      <div className="work-grid portfolio-grid">
        {visibleStudies.map((study) => (
          <PortfolioCard key={study.slug} study={study} />
        ))}
      </div>
    </>
  )
}
