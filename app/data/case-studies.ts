export type CaseStudyImage = {
  src: string
  alt: string
}

export type CaseStudyResult = {
  metric: string
  label: string
}

export type CaseStudy = {
  slug: string
  title: string
  client: string
  industry: string
  servicesProvided: string[]
  summary: string
  challenge: string
  solution: string
  results: CaseStudyResult[]
  techStack: string[]
  timeline: string
  images: CaseStudyImage[]
  screenshotPlaceholder: string
  liveUrl?: string
  published: boolean
  publicationApproved: boolean
  contactService: string
}

const missing = {
  services: "[Owner input needed: confirm services provided.]",
  challenge: "[Owner input needed: document the client's original problem.]",
  solution: "[Owner input needed: describe what Smithy Systems delivered.]",
  results: "[Owner input needed: confirm measured outcomes with the client.]",
  techStack: "[Owner input needed: confirm the technologies used.]",
  timeline: "[Owner input needed: confirm the project timeline.]",
  images: "[Owner input needed: supply approved project screenshots.]",
  permission: "[Owner input needed: obtain permission to publish this case study.]",
} as const

export const caseStudyPlaceholders = missing

export const portfolioContent = {
  projectsHeading: "Browse projects",
  filterLabel: "Filter projects by industry",
  allIndustriesLabel: "All industries",
  previewPlaceholder: "Project preview",
  caseStudyLinkLabel: "View case study",
  unpublishedLabel: "Case study coming soon",
  problemHeading: "The problem",
  solutionHeading: "What we built",
  resultsHeading: "Results",
  detailsHeading: "Tech and timeline",
  similarProjectCta: "Start a similar project",
  relatedHeading: "More selected work",
  portfolioCtaHeading: "Have a project in mind?",
  portfolioCtaCopy: "Tell us what you’re working on and we’ll help you find a clear next step.",
  portfolioCtaLink: "Start a conversation",
  resultsUnavailable: "Results are being confirmed with the client.",
  detailsUnavailable: "Project details are being confirmed with the client.",
  liveProjectLink: "Visit the live project",
} as const

export const caseStudies: CaseStudy[] = [
  {
    slug: "kijani-market",
    title: "Kijani Market",
    client: "Kijani Market",
    industry: "Commerce",
    servicesProvided: [missing.services],
    summary: "A flexible commerce experience giving a Kenyan lifestyle brand room to move.",
    challenge: missing.challenge,
    solution: missing.solution,
    results: [{ metric: missing.results, label: missing.results }],
    techStack: [missing.techStack],
    timeline: missing.timeline,
    images: [],
    screenshotPlaceholder: missing.images,
    published: false,
    publicationApproved: false,
    contactService: "Not sure yet",
  },
  {
    slug: "afya-connect",
    title: "Afya Connect",
    client: "Afya Connect",
    industry: "Health",
    servicesProvided: [missing.services],
    summary: "A patient-first digital product making care feel more connected.",
    challenge: missing.challenge,
    solution: missing.solution,
    results: [{ metric: missing.results, label: missing.results }],
    techStack: [missing.techStack],
    timeline: missing.timeline,
    images: [],
    screenshotPlaceholder: missing.images,
    published: false,
    publicationApproved: false,
    contactService: "Not sure yet",
  },
  {
    slug: "mara-logistics",
    title: "Mara Logistics",
    client: "Mara Logistics",
    industry: "Operations",
    servicesProvided: [missing.services],
    summary: "A clear operating system for a logistics team managing more complexity.",
    challenge: missing.challenge,
    solution: missing.solution,
    results: [{ metric: missing.results, label: missing.results }],
    techStack: [missing.techStack],
    timeline: missing.timeline,
    images: [],
    screenshotPlaceholder: missing.images,
    published: false,
    publicationApproved: false,
    contactService: "Not sure yet",
  },
  {
    slug: "tangaza-learning",
    title: "Tangaza Learning",
    client: "Tangaza Learning",
    industry: "Education",
    servicesProvided: [missing.services],
    summary: "A learning platform designed around access, attention, and progress.",
    challenge: missing.challenge,
    solution: missing.solution,
    results: [{ metric: missing.results, label: missing.results }],
    techStack: [missing.techStack],
    timeline: missing.timeline,
    images: [],
    screenshotPlaceholder: missing.images,
    published: false,
    publicationApproved: false,
    contactService: "Not sure yet",
  },
  {
    slug: "safi-living",
    title: "Safi Living",
    client: "Safi Living",
    industry: "Wellness",
    servicesProvided: [missing.services],
    summary: "A new digital home for an East African wellness company with a lot to say.",
    challenge: missing.challenge,
    solution: missing.solution,
    results: [{ metric: missing.results, label: missing.results }],
    techStack: [missing.techStack],
    timeline: missing.timeline,
    images: [],
    screenshotPlaceholder: missing.images,
    published: false,
    publicationApproved: false,
    contactService: "Not sure yet",
  },
  {
    slug: "savanna-ops",
    title: "Savanna Ops",
    client: "Savanna Ops",
    industry: "Agriculture",
    servicesProvided: [missing.services],
    summary: "One calm view across the moving parts of a growing agri-business.",
    challenge: missing.challenge,
    solution: missing.solution,
    results: [{ metric: missing.results, label: missing.results }],
    techStack: [missing.techStack],
    timeline: missing.timeline,
    images: [],
    screenshotPlaceholder: missing.images,
    published: false,
    publicationApproved: false,
    contactService: "Not sure yet",
  },
]

export function isCaseStudyPublishable(study: CaseStudy): boolean {
  const hasPlaceholder = (value: string) => value.startsWith("[Owner input needed:")
  const isComplete = (value: string) => value.trim().length > 0 && !hasPlaceholder(value)

  return (
    study.published &&
    study.publicationApproved &&
    isComplete(study.challenge) &&
    isComplete(study.solution) &&
    isComplete(study.timeline) &&
    study.servicesProvided.length > 0 &&
    study.servicesProvided.every(isComplete) &&
    study.techStack.length > 0 &&
    study.techStack.every(isComplete) &&
    study.images.length > 0 &&
    !study.screenshotPlaceholder.trim() &&
    study.images.every((image) => isComplete(image.src) && isComplete(image.alt)) &&
    study.results.length > 0 &&
    study.results.every((result) => isComplete(result.metric) && isComplete(result.label))
  )
}

export const publishedCaseStudies = caseStudies.filter(isCaseStudyPublishable)
export const caseStudyIndustries = [...new Set(caseStudies.map((study) => study.industry))]
