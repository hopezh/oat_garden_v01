import { useState } from 'react'

export default function TagFilter({ tags, selected, onToggle, onClear, groupByTag, onGroupToggle }) {
  // Collapsed by default; on desktop CSS forces the list open (the sidebar sits
  // in its own column there), so this only collapses the chips on narrow screens
  // where the sidebar stacks above the cards.
  const [open, setOpen] = useState(false)

  if (tags.length === 0) return null

  return (
    <div>
      <div className="tag-filter">
        <button
          type="button"
          className="tag-filter__toggle"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="label">Tags</span>
          <span className="tag-filter__chevron" aria-hidden="true" />
        </button>
        <div className={`tag-filter__chips${open ? ' open' : ''}`}>
          {tags.map(({ tag, count }) => (
            <button
              key={tag}
              type="button"
              className={`chip${selected.includes(tag) ? ' active' : ''}`}
              onClick={() => onToggle(tag)}
              aria-pressed={selected.includes(tag)}
            >
              {tag}
              <span className="count">{count}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="filter-actions">
        <label className="toggle">
          <input type="checkbox" checked={groupByTag} onChange={onGroupToggle} />
          Group by tag
        </label>
        {selected.length > 0 && (
          <button type="button" className="text-btn" onClick={onClear}>
            Clear {selected.length} filter{selected.length > 1 ? 's' : ''}
          </button>
        )}
      </div>
    </div>
  )
}
