export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by title, description, or tag…"
        aria-label="Search pages"
        autoComplete="off"
        spellCheck="false"
      />
      {value && (
        <button type="button" className="clear" onClick={() => onChange('')} aria-label="Clear search">
          ×
        </button>
      )}
    </div>
  )
}
