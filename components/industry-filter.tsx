export type IndustryFilterOption = {
  value: string
  label: string
  count: number
}

type IndustryFilterProps = {
  options: IndustryFilterOption[]
  activeIndustry: string
  onSelect: (industry: string) => void
}

export function IndustryFilter({
  options,
  activeIndustry,
  onSelect,
}: IndustryFilterProps) {
  return (
    <div className="portfolio-filters" role="group" aria-label="Filter projects by industry">
      {options.map((option) => (
        <button
          className="portfolio-filter"
          key={option.value}
          type="button"
          aria-pressed={activeIndustry === option.value}
          onClick={() => onSelect(option.value)}
        >
          <span>{option.label}</span>
          <span className="portfolio-filter-count">{option.count}</span>
        </button>
      ))}
    </div>
  )
}
