import Link from "next/link"
import { ArrowUpRight, MoveRight } from "lucide-react"
import { caseStudies } from "@/app/data/case-studies"
import { PortfolioCard } from "@/components/portfolio-card"

const services = [
  ["01", "Digital products", "Websites and platforms that turn complicated ideas into clear, useful experiences."],
  ["02", "Business systems", "Connected tools that help teams in Kenya and across Africa work with more clarity."],
  ["03", "Technology strategy", "Practical architecture, automation, and product thinking for the next stage of growth."],
]

export default function HomePage() {
  return <main>
    <section className="hero"><div className="shell"><p className="eyebrow">Technology partner / Nairobi, Kenya</p><h1>Forge what is <em>next.</em></h1><p className="hero-copy">Smithy Systems helps ambitious teams turn hard problems into dependable digital products, platforms, and business systems.</p><div className="hero-actions"><Link className="button button-primary" href="/contact">Start a conversation <ArrowUpRight size={17} /></Link><Link className="button button-light" href="/portfolio">See our work <MoveRight size={17} /></Link></div></div></section>
    <section className="section"><div className="shell"><div className="section-heading"><h2>Built close.<br />Built to last.</h2><p>We bring strategy, design, engineering, and care into the same room. That is how good ideas become useful products.</p></div><div className="services-grid">{services.map(([number, title, text]) => <article className="service-card" key={number}><span className="service-number">{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="section section-tint"><div className="shell"><div className="section-heading"><h2>Selected<br />work</h2><Link className="button button-dark" href="/portfolio">All projects <ArrowUpRight size={17} /></Link></div><div className="work-grid portfolio-grid">{caseStudies.slice(0, 3).map((study) => <PortfolioCard key={study.slug} study={study} />)}</div></div></section>
    <section className="section"><div className="shell split"><div><p className="eyebrow">A useful kind of different</p><h2>Less noise.<br />More signal.</h2></div><div><p>We believe the best technology work feels obvious in hindsight. It is distinctive without being loud, considered without being slow, and built to keep working after launch.</p><Link className="button button-dark" href="/about">Meet Smithy <ArrowUpRight size={17} /></Link></div></div></section>
  </main>
}
