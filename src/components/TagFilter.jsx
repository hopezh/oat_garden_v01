export default function TagFilter({ tags, selected, onToggle, onClear, groupByTag, onGroupToggle }) {
  if (tags.length === 0) return null

  return (
    <div>
      <div className="tag-filter">
        <span className="label">Tags</span>
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
