---
description: Auto-fill missing <meta> description/keywords/date in public/pages/*.html via a workflow, then re-index
argument-hint: "[all]   (default: only files missing metadata; 'all' re-enriches every page)"
allowed-tools: Glob, Grep, Read, Edit, Bash, Workflow
---

Enrich the standalone HTML pages in `public/pages/` with the metadata that
`build_index.py` reads (`<title>` is left alone; this fills `description`,
`keywords`, and `date`), then regenerate `public/posts.json`.

User argument: `$ARGUMENTS` (empty = default mode; `all` = force re-enrich every page).

Do this step by step:

1. **Find the pages.** Glob `public/pages/*.html`. If there are none, tell the user and stop.

2. **Decide which files to enrich.**
   - If the argument is `all`, enrich every globbed file.
   - Otherwise (default), enrich only files **missing at least one** of these in their `<head>`:
     `<meta name="description">`, `<meta name="keywords">`, `<meta name="date">`.
     Use Grep on each file to check. A file that already has all three is skipped.
   - If nothing needs enriching, report "All pages already have complete metadata — nothing to do" and stop.

3. **Run the enrichment workflow.** A known-good workflow script lives at
   `.claude/workflows/enrich-pages.mjs`. Open it and edit ONLY the two CONFIG lines:
   - Set `DIR` to the **absolute** path of this project's `public/pages` folder
     (resolve it from the current working directory; use Windows backslashes, doubled, e.g.
     `'C:\\Users\\...\\public\\pages'`).
   - Set `FILES` to the JavaScript array of the filenames (just the base names, not full paths)
     selected in step 2, e.g. `['foo.html', 'bar.html']`.
   Do not change anything else in the script. Then run it with:
   `Workflow({ scriptPath: "<absolute path to .claude/workflows/enrich-pages.mjs>" })`
   It runs three phases — Analyze (one agent per file) → Curate (unify the tag vocabulary) →
   Inject (write the meta tags into each file). Wait for it to finish.

4. **Re-index.** Run `python build_index.py` so `public/posts.json` reflects the new metadata.

5. **Report.** Summarize which files were enriched, the unified tag set the workflow produced,
   and the new total in `posts.json`. Remind the user to review the changes (`git diff public/pages`)
   and that committing `public/pages/` + `public/posts.json` and pushing will redeploy the site.

Notes:
- The Inject step **replaces** existing description/keywords/date rather than duplicating them,
  so `all` mode is safe to re-run; it just refreshes the metadata.
- If a workflow script edit ever causes a JS parse error, re-read `.claude/workflows/enrich-pages.mjs`
  and re-apply only the two CONFIG-line changes — the rest of the script is known-good.
