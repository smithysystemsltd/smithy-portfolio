const services = [
  ["01", "Web development", "Fast, accessible websites and web applications built around real user needs.", "Next.js / React / APIs / CMS"],
  ["02", "Product design", "Research, journeys, prototypes, and systems that make complex products feel simple.", "Research / UX / UI / Design systems"],
  ["03", "Mobile apps", "Focused iOS and Android experiences that feel native, useful, and easy to return to.", "React Native / Flutter / Prototyping"],
  ["04", "Automation and AI", "Practical intelligence that saves time, surfaces insight, and helps teams move faster.", "Workflows / Integrations / AI features"],
  ["05", "Product engineering", "Durable technical foundations that support a product today and its next chapter.", "Architecture / Cloud / DevOps"],
  ["06", "Ongoing partnership", "A senior team to help your product keep improving after the first release.", "Iteration / Support / Growth"],
]

export default function ServicesPage() {
  return <main><section className="page-intro"><div className="shell"><p className="eyebrow">Capabilities</p><h1>From first thought to useful thing.</h1><p>Bring us the messy brief, the half-formed idea, or the product that needs a sharper second act.</p></div></section><section className="section"><div className="shell"><div className="services-grid">{services.map(([number, title, text, tags]) => <article className="service-card" key={number}><span className="service-number">{number}</span><h3>{title}</h3><p>{text}</p><p className="work-meta">{tags}</p></article>)}</div></div></section></main>
}
