import { useEffect, useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import SearchBar from './components/SearchBar.jsx'
import TagFilter from './components/TagFilter.jsx'
import CardGrid from './components/CardGrid.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import { useTheme } from './hooks/useTheme.js'
// Inlined (not <img>) so the page's data-theme on <html> cascades into the
// SVG and its embedded dark/light <style> tracks the theme toggle live.
import coverSvg from '../public/cover_img_v14.svg?raw'

const BASE = import.meta.env.BASE_URL

export default function App() {
  const { theme, toggleTheme } = useTheme()

  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [query, setQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [groupByTag, setGroupByTag] = useState(false)

  // Fetch the generated manifest (path respects the base for /<repo>/ on Pages).
  useEffect(() => {
    let cancelled = false
    fetch(`${BASE}posts.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (!cancelled) {
          setPosts(Array.isArray(data) ? data : [])
          setStatus('ready')
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Unique tags with usage counts, most-used first.
  const tagList = useMemo(() => {
    const counts = new Map()
    for (const p of posts) {
      for (const tag of p.tags || []) counts.set(tag, (counts.get(tag) || 0) + 1)
    }
    return [...counts.entries()]
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
  }, [posts])

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: [
          { name: 'title', weight: 0.5 },
          { name: 'description', weight: 0.3 },
          { name: 'tags', weight: 0.2 },
        ],
        threshold: 0.38,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [posts]
  )

  // Search first (Fuse), then narrow by selected tags (AND semantics).
  const filtered = useMemo(() => {
    const q = query.trim()
    const base = q ? fuse.search(q).map((r) => r.item) : posts
    if (selectedTags.length === 0) return base
    return base.filter((p) => selectedTags.every((t) => (p.tags || []).includes(t)))
  }, [query, selectedTags, fuse, posts])

  // When grouping, a post appears under each of its (selected-or-all) tags.
  const grouped = useMemo(() => {
    if (!groupByTag) return null
    const activeTags = selectedTags.length > 0 ? selectedTags : tagList.map((t) => t.tag)
    const groups = activeTags
      .map((tag) => ({ tag, items: filtered.filter((p) => (p.tags || []).includes(tag)) }))
      .filter((g) => g.items.length > 0)
    const untagged = filtered.filter((p) => !(p.tags || []).length)
    if (untagged.length) groups.push({ tag: 'untagged', items: untagged })
    return groups
  }, [groupByTag, filtered, selectedTags, tagList])

  const toggleTag = (tag) =>
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))

  return (
    <div className="app">
      <div className="site-cover">
        <div
          className="site-cover__bg"
          role="presentation"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: coverSvg }}
        />
        <header className="site-header">
          <div>
            <h1 className="site-title">Oat Garden</h1>
            <p className="site-tagline">
              A collection of distilled knowledge cards - Ji ZHANG
            </p>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </header>
      </div>

      <div className="layout">
        <aside className="sidebar">
          <SearchBar value={query} onChange={setQuery} />
          <TagFilter
            tags={tagList}
            selected={selectedTags}
            onToggle={toggleTag}
            onClear={() => setSelectedTags([])}
            groupByTag={groupByTag}
            onGroupToggle={() => setGroupByTag((g) => !g)}
          />
        </aside>

        <main className="content">
          {status === 'loading' && (
            <div className="state">
              <p>Loading pages…</p>
            </div>
          )}

          {status === 'error' && (
            <div className="state">
              <h2>Couldn’t load the index</h2>
              <p>
                Run <code>python build_index.py</code> to generate <code>public/posts.json</code>, then reload.
              </p>
            </div>
          )}

          {status === 'ready' && (
            <>
              <p className="result-count">
                {filtered.length} of {posts.length} page{posts.length === 1 ? '' : 's'}
                {query && <> matching “{query}”</>}
              </p>

              {filtered.length === 0 ? (
                <div className="state">
                  <h2>No matches</h2>
                  <p>Try a different search term or clear your tag filters.</p>
                </div>
              ) : groupByTag ? (
                grouped.map((group) => (
                  <section className="group" key={group.tag}>
                    <h2 className="group-heading">
                      {group.tag}
                      <span className="count">{group.items.length}</span>
                    </h2>
                    <CardGrid posts={group.items} selectedTags={selectedTags} onTagClick={toggleTag} />
                  </section>
                ))
              ) : (
                <CardGrid posts={filtered} selectedTags={selectedTags} onTagClick={toggleTag} />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
