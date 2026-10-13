import { siteConfig } from "@/config/site"

type BreadcrumbItem = {
  name: string
  path: string
}

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}

export function OrganizationStructuredData() {
  const sameAs = Object.values(siteConfig.socialUrls).filter(
    (url): url is string => Boolean(url),
  )
  const organization = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${siteConfig.siteUrl}/#organization`,
    name: siteConfig.name,
    url: `${siteConfig.siteUrl}/`,
    logo: `${siteConfig.siteUrl}${siteConfig.logoPath}`,
    email: siteConfig.businessEmail,
    telephone: siteConfig.phone.tel,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.addressLocality,
      addressCountry: siteConfig.addressCountry,
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }

  return <JsonLd data={organization} />
}

export function BreadcrumbStructuredData({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.siteUrl}${item.path}`,
    })),
  }

  return <JsonLd data={breadcrumbs} />
}
