const projects = [
  ["01", "Kijani Market", "Commerce / Product", "A flexible commerce experience giving a Kenyan lifestyle brand room to move."],
  ["02", "Afya Connect", "Health / Platform", "A patient-first digital product making care feel more connected."],
  ["03", "Mara Logistics", "Operations / Systems", "A clear operating system for a logistics team managing more complexity."],
  ["04", "Tangaza Learning", "Education / Web", "A learning platform designed around access, attention, and progress."],
  ["05", "Safi Living", "Wellness / Brand", "A new digital home for an East African wellness company with a lot to say."],
  ["06", "Savanna Ops", "Agriculture / Systems", "One calm view across the moving parts of a growing agri-business."],
]

export default function PortfolioPage() {
  return <main><section className="page-intro"><div className="shell"><p className="eyebrow">Selected work</p><h1>Useful, memorable, built to last.</h1><p>A few collaborations across commerce, health, operations, education, and the spaces between.</p></div></section><section className="section"><div className="shell"><div className="work-grid">{projects.map(([number, title, category, text]) => <article className="work-card" key={number}><span className="work-meta">{number} / {category}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section></main>
}
