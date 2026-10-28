type PortfolioHeroProps = {
  industries: string[]
}

export function PortfolioHero({ industries }: PortfolioHeroProps) {
  return (
    <section className="portfolio-hero" aria-labelledby="portfolio-title">
      <div className="shell portfolio-hero-inner">
        <p className="eyebrow">Selected work / Nairobi, Kenya</p>
        <h1 id="portfolio-title">Forge what is next.</h1>
        <p className="portfolio-hero-copy">
          Digital products and systems built with growing teams across industries.
        </p>
        <div className="portfolio-proof" role="group" aria-label="Industries served">
          <span className="portfolio-proof-label">Across</span>
          <ul>
            {industries.map((industry) => <li key={industry}>{industry}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
