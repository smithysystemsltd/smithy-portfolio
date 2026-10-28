const businessEmail =
  process.env.CONTACT_TO_EMAIL?.trim() || "smithysystemsltd@gmail.com"
const phone = {
  display: "+254 799 749 761",
  tel: "+254799749761",
}
const whatsappMessage = "Hi Smithy Systems, I'd like to discuss a project."
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://smithysystems.co.ke")
  .replace(/\/+$/, "")
const socialUrls: Record<"linkedin" | "github", string | null> = {
  linkedin: null,
  github: null,
}

export const siteConfig = {
  name: "Smithy Systems",
  siteUrl,
  logoPath: "/images/logos/smithynobg.png",
  addressLocality: "Nairobi",
  addressCountry: "KE",
  businessEmail,
  whatsapp: {
    url: `https://wa.me/${phone.tel.slice(1)}?text=${encodeURIComponent(whatsappMessage)}`,
    label: "Chat with us on WhatsApp",
    message: whatsappMessage,
  },
  phone,
  location: "Nairobi, Kenya / Working worldwide",
  responseTimePromise: "Within one business day",
  socialUrls,
  bookingUrl:
    process.env.BOOKING_URL?.trim() ||
    "https://cal.com/smithysystems-3cep9g/30min",
  bookingLabel: "Book a free 30-minute call",
} as const
