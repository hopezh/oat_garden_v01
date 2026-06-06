export const SORT_OPTIONS = [
  { value: 'date-desc', label: 'Date — newest first' },
  { value: 'date-asc', label: 'Date — oldest first' },
  { value: 'title-asc', label: 'Name — A → Z' },
  { value: 'title-desc', label: 'Name — Z → A' },
]

export default function SortControl({ value, onChange }) {
  return (
    <div className="sort-control">
      <label className="label" htmlFor="sort-select">
        Sort
      </label>
      <div className="sort-select-wrap">
        <select
          id="sort-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Sort pages"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  )
}
