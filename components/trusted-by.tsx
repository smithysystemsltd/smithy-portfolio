import Image from "next/image"

const partners = [
  {
    name: "Favor Brands",
    website: "https://favorbrands.co.ke",
    logo: "/images/partners/favorbrands.png",
  },
]

export function TrustedBy() {
  return (
    <section className="trusted-by" aria-label="Trusted by">
      <div className="shell trusted-by-inner">
        <p className="eyebrow">Trusted by</p>
        <ul>
          {partners.map((partner) => (
            <li key={partner.name}>
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${partner.name} website (opens in a new tab)`}
              >
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={290}
                  height={71}
                  className="trusted-by-logo"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
