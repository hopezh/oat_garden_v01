const BASE = import.meta.env.BASE_URL

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function PostCard({ post, selectedTags, onTagClick }) {
  // Links must respect the base path so they resolve under /<repo>/ on Pages.
  const href = `${BASE}pages/${post.file}`

  return (
    <a className="card" href={href} target="_blank" rel="noopener noreferrer">
      <h3 className="card-title">{post.title}</h3>
      {post.description && <p className="card-desc">{post.description}</p>}

      {post.tags?.length > 0 && (
        <div className="card-tags">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="card-tag"
              role="button"
              tabIndex={0}
              aria-pressed={selectedTags.includes(tag)}
              onClick={(e) => {
                e.preventDefault()
                onTagClick(tag)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onTagClick(tag)
                }
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="card-footer">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span className="open">
          Open
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7M7 7h10v10" />
          </svg>
        </span>
      </div>
    </a>
  )
}
