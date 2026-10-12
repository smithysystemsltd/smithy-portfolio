import { MessageCircle } from "lucide-react"
import { siteConfig } from "@/config/site"

export function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={siteConfig.whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={siteConfig.whatsapp.label}
    >
      <MessageCircle size={23} aria-hidden="true" />
    </a>
  )
}
