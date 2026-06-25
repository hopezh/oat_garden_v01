import { useEffect, useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import SearchBar from './components/SearchBar.jsx'
import SortControl, { SORT_OPTIONS } from './components/SortControl.jsx'
import TagFilter from './components/TagFilter.jsx'
import CardGrid from './components/CardGrid.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import GitHubLink from './components/GitHubLink.jsx'
import { useTheme } from './hooks/useTheme.js'
// Rive animation served as a static asset from public/ (path respects BASE
// for /<repo>/ on Pages). Rendered to a <canvas>, so it does not track the
// theme toggle — fixed look in both light and dark.
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas'

const BASE = import.meta.env.BASE_URL
const SORT_STORAGE_KEY = 'oat-garden-sort'
const DEFAULT_SORT = 'date-desc' // Date — newest first

// Read the remembered sort, falling back to the default if absent/invalid.
function getInitialSort() {
    if (typeof window === 'undefined') return DEFAULT_SORT
    try {
        const stored = window.localStorage.getItem(SORT_STORAGE_KEY)
        if (stored && SORT_OPTIONS.some((o) => o.value === stored)) return stored
    } catch {
        /* storage unavailable (private mode / sandbox) — ignore */
    }
    return DEFAULT_SORT
}

export default function App() {
    const { theme, toggleTheme } = useTheme()

    const { RiveComponent: CoverRive } = useRive({
        src: `${BASE}sparkle-grid.riv`,
        stateMachines: 'State Machine 1',
        autoplay: true,
        layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }),
    })

    const [posts, setPosts] = useState([])
    const [status, setStatus] = useState('loading') // loading | ready | error
    const [query, setQuery] = useState('')
    const [selectedTags, setSelectedTags] = useState([])
    const [groupByTag, setGroupByTag] = useState(false)
    const [sortBy, setSortBy] = useState(getInitialSort)

    // Remember the chosen sort across reloads (same mechanism as the theme).
    useEffect(() => {
        try {
            window.localStorage.setItem(SORT_STORAGE_KEY, sortBy)
        } catch {
            /* storage unavailable (private mode / sandbox) — ignore */
        }
    }, [sortBy])

    // Fetch the generated manifest (path respects the base for /<repo>/ on Pages).
    useEffect(() => {
        let cancelled = false
        // `no-cache` forces revalidation (cheap 304 via ETag) so a freshly
        // deployed manifest is picked up immediately instead of being served
        // from the browser's 10-minute HTTP cache.
        fetch(`${BASE}posts.json`, { cache: 'no-cache' })
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

    // Sort the filtered results by date or title (feeds both grouped + flat views).
    const sorted = useMemo(() => {
        const [key, dir] = sortBy.split('-')
        const factor = dir === 'asc' ? 1 : -1
        return [...filtered].sort((a, b) => {
            if (key === 'title') {
                return factor * (a.title || '').localeCompare(b.title || '')
            }
            // date: empty dates sort to the end regardless of direction.
            const da = a.date || ''
            const db = b.date || ''
            if (!da && !db) return 0
            if (!da) return 1
            if (!db) return -1
            return factor * da.localeCompare(db)
        })
    }, [filtered, sortBy])

    // When grouping, a post appears under each of its (selected-or-all) tags.
    const grouped = useMemo(() => {
        if (!groupByTag) return null
        const activeTags = selectedTags.length > 0 ? selectedTags : tagList.map((t) => t.tag)
        const groups = activeTags
            .map((tag) => ({ tag, items: sorted.filter((p) => (p.tags || []).includes(tag)) }))
            .filter((g) => g.items.length > 0)
        const untagged = sorted.filter((p) => !(p.tags || []).length)
        if (untagged.length) groups.push({ tag: 'untagged', items: untagged })
        return groups
    }, [groupByTag, sorted, selectedTags, tagList])

    const toggleTag = (tag) =>
        setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))

    return (
        <div className="app">
            <div className="site-cover">
                <CoverRive
                    className="site-cover__bg"
                    role="presentation"
                    aria-hidden="true"
                />
                <header className="site-header">
                    <div>
                        <h1 className="site-title">Oat Garden</h1>
                        <p className="site-tagline">
                            A collection of knowledge cards distilled from chats with Claude by Claude ·{' '}
                            <a
                                className="site-tagline__credit"
                                href="https://rive.app/marketplace/14866-28064-sparkle-grid/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Rive animation
                            </a>
                        </p>
                    </div>
                    <div className="header-actions">
                        <GitHubLink href="https://github.com/hopezh/oat_garden_v01" />
                        <ThemeToggle theme={theme} onToggle={toggleTheme} />
                    </div>
                </header>
            </div>

            <div className="layout">
                <aside className="sidebar">
                    <SearchBar value={query} onChange={setQuery} />
                    <SortControl value={sortBy} onChange={setSortBy} />
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
                                <CardGrid posts={sorted} selectedTags={selectedTags} onTagClick={toggleTag} />
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    )
}
