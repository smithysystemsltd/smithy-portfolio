const businessEmail = "hello@smithysystems.co.ke"
const phone = {
  display: "+254 799 749 761",
  tel: "+254799749761",
}
const whatsappMessage = "Hi Smithy Systems, I'd like to discuss a project."

export const siteConfig = {
  businessEmail,
  whatsapp: {
    url: `https://wa.me/${phone.tel.slice(1)}?text=${encodeURIComponent(whatsappMessage)}`,
    label: "Chat with us on WhatsApp",
    message: whatsappMessage,
  },
  phone,
  location: "Nairobi, Kenya / Working worldwide",
  responseTimePromise: "Within one business day",
  socialUrls: {
    linkedin: null,
    github: null,
  },
  bookingUrl: process.env.BOOKING_URL?.trim() ?? "",
  bookingLabel: "Book a free 30-minute call",
} as const
