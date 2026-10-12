export const contactFormContent = {
  name: {
    label: "Name",
    placeholder: "Your name",
  },
  email: {
    label: "Email",
    placeholder: "you@company.com",
  },
  company: {
    label: "Company (optional)",
    placeholder: "Your company",
  },
  projectType: {
    label: "Project type",
    placeholder: "Choose a project type",
  },
  timeline: {
    label: "Timeline (optional)",
    placeholder: "Choose a timeline",
  },
  message: {
    label: "What are you working on?",
    placeholder: "A website, product, platform, or something still taking shape...",
    hint: "Please share at least 20 characters so we can understand what you need.",
  },
  submit: "Send enquiry",
  submitting: "Sending...",
  successTitle: "Thanks for getting in touch.",
  successMessage: "Your enquiry is on its way. We’ll be in touch",
  failureMessage: "We couldn’t send your message just now. Your details are still here; please try again",
  validation: {
    requiredName: "Please enter your name.",
    requiredEmail: "Please enter your email address.",
    invalidEmail: "Please enter a valid email address.",
    requiredMessage: "Please tell us what you are working on.",
    shortMessage: "Please add at least 20 characters.",
  },
} as const

export const projectTypeOptions = [
  { value: "Website", label: "Website" },
  { value: "Web app", label: "Web app" },
  { value: "Mobile app", label: "Mobile app" },
  { value: "Business system", label: "Business system" },
  { value: "Automation/AI", label: "Automation/AI" },
  { value: "Not sure yet", label: "Not sure yet" },
] as const

export type ProjectType = (typeof projectTypeOptions)[number]["value"]

export const timelineOptions = [
  "As soon as possible",
  "Within 1 month",
  "1-3 months",
  "3+ months",
  "Just exploring",
] as const

export type Timeline = (typeof timelineOptions)[number]

export type ContactFormValues = {
  name: string
  email: string
  company: string
  projectType: ProjectType | ""
  timeline: Timeline | ""
  message: string
}

export function getProjectTypeFromService(service?: string): ProjectType | "" {
  if (!service) return ""

  const normalized = service.trim().toLowerCase()
  const option = projectTypeOptions.find(
    ({ value }) => value.toLowerCase() === normalized,
  )
  if (option) return option.value

  const serviceMappings: Record<string, ProjectType> = {
    "web-development": "Website",
    "product-design": "Not sure yet",
    "mobile-apps": "Mobile app",
    "automation-and-ai": "Automation/AI",
    "product-engineering": "Business system",
    "ongoing-partnership": "Not sure yet",
  }

  return serviceMappings[normalized] ?? ""
}
