/**
 * enrich-pages workflow — used by the /enrich-pages slash command.
 *
 * 3 phases:
 *   Analyze  — one agent per HTML file reads its real content and proposes a
 *              description, 3-6 topic tags, and a date.
 *   Curate   — one agent unifies those into a single consistent tag vocabulary
 *              so the site's tag filter groups related pages together.
 *   Inject   — one agent per file writes <meta description/keywords/date> into
 *              <head>, replacing any existing ones (never duplicating).
 *
 * The command edits the two CONFIG values below before running:
 *   - DIR   : absolute path to public/pages
 *   - FILES : the list of *.html filenames in that folder to enrich
 */

export const meta = {
  name: 'enrich-pages',
  description: 'Read each HTML page, derive a shared tag taxonomy, and inject <meta> tags into each file',
  phases: [
    { title: 'Analyze', detail: 'one agent per HTML file reads content + proposes description/tags' },
    { title: 'Curate', detail: 'unify proposed tags into one clean shared taxonomy' },
    { title: 'Inject', detail: 'write description/keywords/date <meta> tags into each file head' },
  ],
}

// ── CONFIG: the /enrich-pages command rewrites these two lines each run ──────
const DIR = 'C:\\Users\\hopez\\Downloads\\dev\\oat_garden_v01\\public\\pages'
const FILES = [
  'Claude Context Switcher (Refined).html',
  'Claude Context Switcher (Refined) Marathon style.html',
  'claude-code-dynamic-workflows_v02.html',
  'static-site-hosting-guide_v02.html',
  'claude-prompting-guide_v2_v02.html',
  'claude-projects-vs-notebooklm_v02.html',
  'claude-code-3d-web-field-manual_v04_v02.html',
]
// ────────────────────────────────────────────────────────────────────────────

const FALLBACK_DATE = '2026-06-01'

const ANALYZE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['file', 'title', 'description', 'suggestedTags', 'date'],
  properties: {
    file: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string', description: 'One sentence, <=160 chars, plain text, no quotes' },
    suggestedTags: { type: 'array', items: { type: 'string' }, description: '3-6 lowercase-kebab topic tags' },
    date: { type: 'string', description: 'YYYY-MM-DD; infer from content if a date is present, else use fallback' },
  },
}

const CURATE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['files'],
  properties: {
    files: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['file', 'description', 'tags', 'date'],
        properties: {
          file: { type: 'string' },
          description: { type: 'string' },
          tags: { type: 'array', items: { type: 'string' } },
          date: { type: 'string' },
        },
      },
    },
  },
}

const INJECT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['file', 'ok', 'note'],
  properties: {
    file: { type: 'string' },
    ok: { type: 'boolean' },
    note: { type: 'string' },
  },
}

function analyzeThunk(f) {
  return () => agent(
    'Read the HTML file at "' + DIR + '\\' + f + '" (use the Read tool). It is a standalone article/guide page.\n' +
    'Derive metadata describing its CONTENT (not generic boilerplate):\n' +
    '- title: the existing <title> text verbatim\n' +
    '- description: ONE plain-text sentence, <=160 chars, no surrounding quotes, summarizing what the page covers\n' +
    '- suggestedTags: 3-6 lowercase-kebab topic tags (e.g. claude-code, prompting, github-pages, three-js, react)\n' +
    '- date: if the content clearly states a date use it (YYYY-MM-DD), otherwise return "' + FALLBACK_DATE + '"\n' +
    'Return ONLY the structured object. Do not edit the file.',
    { label: 'analyze:' + f, phase: 'Analyze', schema: ANALYZE_SCHEMA }
  )
}

function injectThunk(rec) {
  return () => {
    const safeDesc = rec.description.split('"').join("'")
    const kw = rec.tags.join(', ')
    return agent(
      'Edit the HTML file at "' + DIR + '\\' + rec.file + '".\n' +
      'Insert (or update) these three meta tags inside <head>, immediately AFTER the closing </title> tag, matching existing indentation:\n' +
      '  <meta name="description" content="' + safeDesc + '">\n' +
      '  <meta name="keywords" content="' + kw + '">\n' +
      '  <meta name="date" content="' + rec.date + '">\n' +
      'Rules:\n' +
      '- Use the Read tool first, then the Edit tool.\n' +
      '- If a <meta name="description"> already exists, REPLACE its content attribute rather than adding a duplicate.\n' +
      '- If <meta name="keywords"> or <meta name="date"> already exist, update them instead of duplicating.\n' +
      '- Change NOTHING else in the file. Preserve all other markup, scripts, and styles exactly.\n' +
      'Return the structured result (ok=true if the edit applied cleanly).',
      { label: 'inject:' + rec.file, phase: 'Inject', schema: INJECT_SCHEMA }
    )
  }
}

if (FILES.length === 0) {
  log('No files to enrich — FILES is empty.')
  return { taxonomy: [], files: [], injected: [] }
}

phase('Analyze')
const analyses = (await parallel(FILES.map(analyzeThunk))).filter(Boolean)
log('Analyzed ' + analyses.length + ' files; curating a shared tag taxonomy')

phase('Curate')
const curated = await agent(
  'You are unifying tag vocabularies across a small site so its tag filter groups pages coherently.\n' +
  'Here are per-file analyses (JSON):\n' +
  JSON.stringify(analyses, null, 2) + '\n\n' +
  'Produce a final record for EACH file with:\n' +
  '- file: unchanged filename\n' +
  '- description: keep or lightly polish the analyzed description (<=160 chars, plain text, no quotes)\n' +
  '- tags: 3-6 tags from a SINGLE consistent vocabulary. Merge near-duplicates (e.g. claude/claude-code -> claude-code, 3d/threejs/three-js -> three-js). Reuse the same tag string across files when topics overlap so filtering groups them. lowercase-kebab only.\n' +
  '- date: keep the analyzed date\n\n' +
  'Return ONLY the structured object with a "files" array covering all ' + analyses.length + ' files.',
  { label: 'curate:taxonomy', phase: 'Curate', schema: CURATE_SCHEMA }
)
log('Curated taxonomy; injecting <meta> tags into ' + curated.files.length + ' files')

phase('Inject')
const injected = (await parallel(curated.files.map(injectThunk))).filter(Boolean)

return {
  taxonomy: Array.from(new Set(curated.files.flatMap((f) => f.tags))).sort(),
  files: curated.files.map((f) => ({ file: f.file, tags: f.tags, date: f.date })),
  injected: injected,
}
