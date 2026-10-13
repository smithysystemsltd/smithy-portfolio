import { NextResponse } from "next/server"
import {
  projectTypeOptions,
  timelineOptions,
} from "@/app/data/contact"
import { siteConfig } from "@/config/site"

const rateLimitWindowMs = 10 * 60 * 1000
const rateLimitMaximum = 5
const rateLimitByIp = new Map<string, { count: number; resetAt: number }>()

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

function isValidEmail(email: string): boolean {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isAllowedOption(value: string, options: readonly string[]): boolean {
  return value === "" || options.includes(value)
}

function getRateLimitKey(request: Request): string {
  const realIp = request.headers.get("x-real-ip")?.trim()
  if (realIp) return realIp

  const forwardedFor = request.headers.get("x-forwarded-for")
  return forwardedFor?.split(",")[0]?.trim() || "unknown"
}

function isRateLimited(key: string, now: number): boolean {
  for (const [ip, limit] of rateLimitByIp) {
    if (limit.resetAt <= now) rateLimitByIp.delete(ip)
  }

  const current = rateLimitByIp.get(key)
  if (!current || current.resetAt <= now) {
    if (rateLimitByIp.size >= 10_000) {
      const oldestKey = rateLimitByIp.keys().next().value
      if (oldestKey) rateLimitByIp.delete(oldestKey)
    }
    rateLimitByIp.set(key, { count: 1, resetAt: now + rateLimitWindowMs })
    return false
  }
  if (current.count >= rateLimitMaximum) return true

  current.count += 1
  return false
}

async function sendEmail(
  apiKey: string,
  from: string,
  message: Record<string, unknown>,
): Promise<{ ok: boolean; status: number }> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, ...message }),
    signal: AbortSignal.timeout(10_000),
  })

  return { ok: response.ok, status: response.status }
}

export async function POST(request: Request) {
  let parsed: unknown
  try {
    parsed = await request.json()
  } catch {
    return NextResponse.json({ error: "Please submit a valid form." }, { status: 400 })
  }

  if (!isRecord(parsed)) {
    return NextResponse.json({ error: "Please submit a valid form." }, { status: 400 })
  }

  if (readString(parsed.website)) {
    return NextResponse.json({ ok: true })
  }

  const name = readString(parsed.name)
  const email = readString(parsed.email)
  const company = readString(parsed.company)
  const projectType = readString(parsed.projectType)
  const timeline = readString(parsed.timeline)
  const message = readString(parsed.message)

  if (
    !name ||
    !isValidEmail(email) ||
    !message ||
    message.length < 20 ||
    name.length > 120 ||
    company.length > 160 ||
    message.length > 10_000 ||
    !isAllowedOption(projectType, projectTypeOptions.map(({ value }) => value)) ||
    !isAllowedOption(timeline, [...timelineOptions])
  ) {
    return NextResponse.json(
      { error: "Please check your details and try again." },
      { status: 400 },
    )
  }

  if (isRateLimited(getRateLimitKey(request), Date.now())) {
    return NextResponse.json(
      { error: "Too many enquiries. Please try again in a few minutes." },
      { status: 429, headers: { "Retry-After": "600" } },
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  const to = siteConfig.businessEmail
  if (!apiKey || !from || !to) {
    console.error(
      "Contact email is not configured: set RESEND_API_KEY, RESEND_FROM_EMAIL, and CONTACT_TO_EMAIL.",
    )
    return NextResponse.json(
      { error: "Email delivery is not configured." },
      { status: 503 },
    )
  }

  const notificationText = [
    "New website enquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "Not provided"}`,
    `Project type: ${projectType || "Not provided"}`,
    `Timeline: ${timeline || "Not provided"}`,
    "",
    "What they are working on:",
    message,
  ].join("\n")

  const notification = {
    to: [to],
    reply_to: email,
    subject: `New website enquiry from ${name}`,
    text: notificationText,
  }

  try {
    const result = await sendEmail(apiKey, from, notification)
    if (!result.ok) {
      console.error("Contact email delivery failed", `HTTP ${result.status}`)
      return NextResponse.json(
        { error: "We could not send your message. Please try again later." },
        { status: 502 },
      )
    }
  } catch (error) {
    console.error(
      "Contact email delivery failed",
      error instanceof Error ? error.message : "network error",
    )
    return NextResponse.json(
      { error: "We could not send your message. Please try again later." },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
