import { NextResponse } from "next/server"

const recipient = "smithysystemsltd@gmail.com"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const name = typeof body?.name === "string" ? body.name.trim() : ""
  const email = typeof body?.email === "string" ? body.email.trim() : ""
  const message = typeof body?.message === "string" ? body.message.trim() : ""

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 })
  }
  if (name.length > 120 || email.length > 254 || message.length > 10000 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide valid contact details and a shorter message." }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  if (!apiKey || !from) {
    console.error("Contact email is not configured: set RESEND_API_KEY and RESEND_FROM_EMAIL.")
    return NextResponse.json({ error: "Email delivery is not configured." }, { status: 503 })
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        subject: "New website contact form submission",
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    })

    if (!response.ok) {
      console.error("Contact email delivery failed", response.status, await response.text())
      return NextResponse.json({ error: "We could not send your message. Please try again later." }, { status: 502 })
    }
  } catch (error) {
    console.error("Contact email request failed", error)
    return NextResponse.json({ error: "We could not send your message. Please try again later." }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
