"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import type { PortfolioProject } from "@/app/data/case-studies"
import { IndustryFilter, type IndustryFilterOption } from "@/components/industry-filter"
import { FeaturedProject } from "@/components/featured-project"
import { ProjectGrid } from "@/components/project-grid"

const pageSize = 9

type PortfolioProjectsProps = {
  projects: PortfolioProject[]
  industries: string[]
  initialIndustry: string
}

function industrySlug(industry: string) {
  return industry.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

export function PortfolioProjects({
  projects,
  industries,
  initialIndustry,
}: PortfolioProjectsProps) {
  const [activeIndustry, setActiveIndustry] = useState(initialIndustry)
  const [visibleCount, setVisibleCount] = useState(pageSize)

  const options = useMemo<IndustryFilterOption[]>(() => [
    { value: "all", label: "All industries", count: projects.length },
    ...industries
      .map((industry) => ({
        value: industrySlug(industry),
        label: industry,
        count: projects.filter((project) => project.industry === industry).length,
      }))
      .filter((industry) => industry.count > 0),
  ], [industries, projects])

  useEffect(() => {
    function syncIndustryFromUrl() {
      const requestedIndustry = new URLSearchParams(window.location.search).get("industry")
      const validIndustry = options.some((option) => option.value === requestedIndustry)
      setActiveIndustry(validIndustry && requestedIndustry ? requestedIndustry : "all")
      setVisibleCount(pageSize)
    }

    window.addEventListener("popstate", syncIndustryFromUrl)
    return () => window.removeEventListener("popstate", syncIndustryFromUrl)
  }, [options])

  const visibleProjects = projects.filter(
    (project) => activeIndustry === "all" || industrySlug(project.industry) === activeIndustry,
  )
  const featuredProject = visibleProjects[0]
  const gridProjects = visibleProjects.slice(1, visibleCount)
  const remainingCount = Math.max(visibleProjects.length - visibleCount, 0)

  function selectIndustry(industry: string) {
    setActiveIndustry(industry)
    setVisibleCount(pageSize)
    const url = new URL(window.location.href)
    if (industry === "all") {
      url.searchParams.delete("industry")
    } else {
      url.searchParams.set("industry", industry)
    }
    window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`)
  }

  return (
    <>
      {featuredProject && <FeaturedProject project={featuredProject} />}
      <section className="section portfolio-projects-section" aria-labelledby="portfolio-projects-heading">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Case studies</p>
              <h2 id="portfolio-projects-heading">Browse selected work</h2>
            </div>
            <p>Clear thinking, useful digital products, and systems built around real work.</p>
          </div>
          <IndustryFilter
            options={options}
            activeIndustry={activeIndustry}
            onSelect={selectIndustry}
          />
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {visibleProjects.length} {visibleProjects.length === 1 ? "project" : "projects"} found.
          </p>
          {gridProjects.length > 0 ? (
            <ProjectGrid projects={gridProjects} />
          ) : !featuredProject ? (
            <div className="portfolio-empty-state">
              <h3>No projects in this industry yet.</h3>
              <p>Tell us what you’re working on and we’ll help you find a clear next step.</p>
              <Link className="button button-dark" href="/contact/">
                Tell us about your project
              </Link>
            </div>
          ) : null}
          {remainingCount > 0 && (
            <div className="portfolio-load-more">
              <button
                className="button button-dark"
                type="button"
                aria-controls="portfolio-project-grid"
                onClick={() => setVisibleCount((count) => count + pageSize)}
              >
                Load {Math.min(remainingCount, pageSize)} more
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
