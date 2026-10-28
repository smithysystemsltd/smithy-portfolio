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
    servicesProvided: ["Headless Commerce Architecture", "Frontend Development", "UX/UI Design"],
    summary: "A flexible commerce experience giving a Kenyan lifestyle brand room to move.",
    challenge: "Kijani Market was experiencing rapid growth, but their legacy monolithic e-commerce platform was holding them back. High traffic during seasonal sales caused server crashes, and a clunky, non-responsive mobile checkout resulted in a 65% cart abandonment rate. They needed a scalable platform that felt culturally authentic but performed like a global tech product.",
    solution: "We migrated Kijani Market to a modern Headless Commerce architecture. By decoupling the frontend from the backend, we gave the design team complete freedom. We built a lightning-fast progressive web app (PWA) using Next.js and React, powered by a Shopify Plus backend via GraphQL. From a UX perspective, we implemented a mobile-first, one-click checkout flow and used warm, earthy UI tones to reflect their branding.",
    results: [
      { metric: "42%", label: "Increase in mobile conversion rates" },
      { metric: "1.1s", label: "Average page load time (down from 4.5s)" }
    ],
    techStack: ["Next.js", "React", "Shopify Plus", "GraphQL"],
    timeline: "12 weeks",
    images: [
      { src: "/images/portfolio/kijani-hero.webp", alt: "iPhone displaying Kijani Market mobile app on a wooden table" },
      { src: "/images/portfolio/kijani-ux.webp", alt: "Isometric 3D render of e-commerce checkout flow UI components" }
    ],
    screenshotPlaceholder: "",
    published: true,
    publicationApproved: true,
    contactService: "Custom Web Application",
  },
  {
    slug: "afya-connect",
    title: "Afya Connect",
    client: "Afya Connect",
    industry: "Health",
    servicesProvided: ["Mobile App Development", "Backend Architecture", "UX/UI Design"],
    summary: "A patient-first digital product making care feel more connected.",
    challenge: "Patients using Afya Connect's previous system found it nearly impossible to navigate their medical history or book timely appointments. The clinic's staff was overwhelmed by manual scheduling, and patient data was fragmented across different legacy databases, creating a disjointed and frustrating care experience.",
    solution: "We engineered a secure, Data Protection Act-compliant patient portal. We built a robust backend using Node.js and PostgreSQL to securely unify patient records. On the frontend, we designed a React Native mobile application with a deeply empathetic UX. We minimized cognitive load by using large, accessible typography, clear step-by-step booking wizards, and a calming blue and white color palette.",
    results: [
      { metric: "50%", label: "Reduction in clinic administrative calls" },
      { metric: "300%", label: "Increase in patient platform adoption in 3 months" }
    ],
    techStack: ["React Native", "Node.js", "PostgreSQL"],
    timeline: "16 weeks",
    images: [
      { src: "/images/portfolio/afya-hero.webp", alt: "iPad and smartphone displaying Afya Connect patient portal on a clinic desk" },
      { src: "/images/portfolio/afya-ux.webp", alt: "Macro close-up of telehealth video call feature and health statistics UI" }
    ],
    screenshotPlaceholder: "",
    published: true,
    publicationApproved: true,
    contactService: "Mobile Application",
  },
  {
    slug: "mara-logistics",
    title: "Mara Logistics",
    client: "Mara Logistics",
    industry: "Operations",
    servicesProvided: ["System Architecture", "Frontend Development", "UX/UI Design"],
    summary: "A clear operating system for a logistics team managing more complexity.",
    challenge: "As Mara Logistics expanded its fleet across East Africa, their dispatchers were drowning in spreadsheets and WhatsApp messages. They lacked real-time visibility into truck locations, leading to delayed deliveries, inefficient routing, and burnt-out operations managers.",
    solution: "We architected a comprehensive fleet operations system from the ground up. Utilizing AWS IoT Core and Go (Golang), we created a high-throughput backend capable of processing thousands of real-time GPS pings per second. For the UX, we built a custom web-based control tower in Vue.js, focusing on 'glanceability' so dispatchers could understand fleet health and active alerts in under 3 seconds.",
    results: [
      { metric: "28%", label: "Decrease in average delivery delays" },
      { metric: "15%", label: "Savings in monthly fuel costs via route optimization" }
    ],
    techStack: ["AWS IoT Core", "Go (Golang)", "Vue.js"],
    timeline: "6 months",
    images: [
      { src: "/images/portfolio/mara-hero.webp", alt: "Dark-mode logistics dashboard on a curved monitor in a dispatch room" },
      { src: "/images/portfolio/mara-ux.webp", alt: "Clean wireframe of a digital map expanding into a fully rendered 3D interface" }
    ],
    screenshotPlaceholder: "",
    published: true,
    publicationApproved: true,
    contactService: "Custom Web Application",
  },
  {
    slug: "tangaza-learning",
    title: "Tangaza Learning",
    client: "Tangaza Learning",
    industry: "Education",
    servicesProvided: ["Progressive Web App (PWA)", "UX/UI Design", "Frontend Development"],
    summary: "A learning platform designed around access, attention, and progress.",
    challenge: "Tangaza Learning’s initial platform suffered from a 70% drop-off rate. The interface was cluttered, overwhelming students, and the video-heavy content was inaccessible to users in low-bandwidth areas. They needed a platform that commanded focus while remaining lightweight and reliable.",
    solution: "We architected an offline-first Progressive Web App (PWA) tailored for emerging markets. Using React and Firebase, we implemented intelligent caching and service workers, allowing students to download modules and sync progress later. From a UX perspective, we stripped away distractions, introducing a minimalist 'Focus Mode' and gamified micro-learning steps to encourage daily streaks.",
    results: [
      { metric: "55%", label: "Increase in course completion rates" },
      { metric: "40%", label: "Reduction in average student data consumption" }
    ],
    techStack: ["React", "Firebase", "PWA"],
    timeline: "14 weeks",
    images: [
      { src: "/images/portfolio/tangaza-hero.webp", alt: "Student desk with laptop and phone showing Tangaza Learning daily streak UI" },
      { src: "/images/portfolio/tangaza-ux.webp", alt: "Transition from low-fidelity wireframe to a polished UI card displaying a quiz module" }
    ],
    screenshotPlaceholder: "",
    published: true,
    publicationApproved: true,
    contactService: "Custom Web Application",
  },
  {
    slug: "safi-living",
    title: "Safi Living",
    client: "Safi Living",
    industry: "Wellness",
    servicesProvided: ["Headless CMS Integration", "Frontend Development", "UX/UI Design"],
    summary: "A new digital home for an East African wellness company with a lot to say.",
    challenge: "Safi Living had a massive library of wellness content and a growing line of physical products, but the two lived in silos. Their generic e-commerce template made rich editorial content hard to find, resulting in low engagement and poor conversion from readers to buyers.",
    solution: "We designed a deeply immersive, editorial-first commerce experience. We utilized a Headless CMS approach, pairing Sanity.io for rich content management with Next.js and the Shopify Storefront API. The UX strategy focused on 'shoppable content'—seamlessly integrating product cards within wellness articles. The visual identity used a calming palette of sage greens, sand, and warm off-whites.",
    results: [
      { metric: "+3.5 min", label: "Increase in average time-on-site" },
      { metric: "28%", label: "Boost in reader-to-buyer conversion rates" }
    ],
    techStack: ["Next.js", "Sanity.io", "Shopify Storefront API"],
    timeline: "16 weeks",
    images: [
      { src: "/images/portfolio/safi-hero.webp", alt: "Sleek tablet displaying wellness website surrounded by a matcha bowl and incense" },
      { src: "/images/portfolio/safi-ux.webp", alt: "Macro shot of a highly polished Wellness Quiz onboarding flow UI" }
    ],
    screenshotPlaceholder: "",
    published: true,
    publicationApproved: true,
    contactService: "E-Commerce Integration",
  },
  {
    slug: "savanna-ops",
    title: "Savanna Ops",
    client: "Savanna Ops",
    industry: "Agriculture",
    servicesProvided: ["Backend Engineering", "Dashboard Development", "UX/UI Design"],
    summary: "One calm view across the moving parts of a growing agri-business.",
    challenge: "Managing thousands of acres, Savanna Ops’ farm managers were suffering from 'alert fatigue.' They were using disjointed systems to track soil moisture, weather, and harvest yields. The data was overwhelming, hard to read under harsh sunlight, and difficult to translate into actionable decisions.",
    solution: "We consolidated their disparate data streams into a single command center. We built a robust backend using Python (Django) to ingest IoT sensor data. For the frontend, we designed a Vue.js dashboard engineered for 'glanceability.' We utilized high-contrast UI for outdoor readability and implemented smart-filtering UX, ensuring managers only saw critical alerts.",
    results: [
      { metric: "12 hrs", label: "Saved per week in reporting for farm managers" },
      { metric: "18%", label: "Reduction in crop loss linked to irrigation delays" }
    ],
    techStack: ["Python (Django)", "Vue.js", "IoT Integration"],
    timeline: "5 months",
    images: [
      { src: "/images/portfolio/savanna-hero.webp", alt: "Rugged tablet in an agricultural field showing a data-rich AgriTech dashboard" },
      { src: "/images/portfolio/savanna-ux.webp", alt: "Isometric breakdown of dark-mode data visualization panels and IoT sensor readouts" }
    ],
    screenshotPlaceholder: "",
    published: true,
    publicationApproved: true,
    contactService: "Custom Web Application",
  }
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