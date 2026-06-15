# Graph Report - .  (2026-06-15)

## Corpus Check
- 69 files · ~240,281 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 265 nodes · 321 edges · 23 communities (22 shown, 1 thin omitted)
- Extraction: 83% EXTRACTED · 17% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.83)
- Token cost: 289,531 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Graphify Skill Pipeline|Graphify Skill Pipeline]]
- [[_COMMUNITY_Build & Package Config|Build & Package Config]]
- [[_COMMUNITY_React UI Components|React UI Components]]
- [[_COMMUNITY_Page Metadata Enrichment|Page Metadata Enrichment]]
- [[_COMMUNITY_AI Coding Philosophy|AI Coding Philosophy]]
- [[_COMMUNITY_Semantic Extraction Spec|Semantic Extraction Spec]]
- [[_COMMUNITY_Project Plan & Overview|Project Plan & Overview]]
- [[_COMMUNITY_Knowledge Graph & LLM Wiki|Knowledge Graph & LLM Wiki]]
- [[_COMMUNITY_Agentic Engineering Workflows|Agentic Engineering Workflows]]
- [[_COMMUNITY_Claude Projects & Memory|Claude Projects & Memory]]
- [[_COMMUNITY_Dev Dependencies|Dev Dependencies]]
- [[_COMMUNITY_Graph Export Formats|Graph Export Formats]]
- [[_COMMUNITY_Cover Art Network Series|Cover Art: Network Series]]
- [[_COMMUNITY_Cover Art Gradient & Branding|Cover Art: Gradient & Branding]]
- [[_COMMUNITY_Enrich-Pages Command|Enrich-Pages Command]]
- [[_COMMUNITY_Static Site Hosting|Static Site Hosting]]
- [[_COMMUNITY_3D Web App Research|3D Web App Research]]
- [[_COMMUNITY_Data Viz App Research|Data Viz App Research]]
- [[_COMMUNITY_Claude Context Switching|Claude Context Switching]]
- [[_COMMUNITY_Marathon Style Study|Marathon Style Study]]
- [[_COMMUNITY_Graphify Settings Hooks|Graphify Settings Hooks]]
- [[_COMMUNITY_Git Worktree|Git Worktree]]
- [[_COMMUNITY_Claude Prompting Guide|Claude Prompting Guide]]

## God Nodes (most connected - your core abstractions)
1. `App` - 11 edges
2. `graphify Skill` - 11 edges
3. `Graphify Pipeline` - 11 edges
4. `HeadMetaParser` - 10 edges
5. `main()` - 8 edges
6. `Exports & Benchmark Reference` - 8 edges
7. `Query / Path / Explain Reference` - 8 edges
8. `Project graphify Usage Rules` - 8 edges
9. `scripts` - 7 edges
10. `graph.json` - 7 edges

## Surprising Connections (you probably didn't know these)
- `plan.md First Workflow` --semantically_similar_to--> `GitHub Pages Static Site Action Plan`  [INFERRED] [semantically similar]
  public/pages/agentic-engineering-mvanhorn_v02.html → PLAN.md
- `Claude Code Skills` --semantically_similar_to--> `/enrich-pages Slash Command`  [INFERRED] [semantically similar]
  public/pages/claude-files-in-3d-web-app.html → README.md
- `GitHub Pages Deploy Workflow` --references--> `posts.json Index`  [INFERRED]
  .github/workflows/deploy.yml → build_index.py
- `HeadMetaParser` --shares_data_with--> `Page <meta> Tags (description/keywords/date)`  [INFERRED]
  build_index.py → .claude/workflows/enrich-pages.mjs
- `GitHub Pages Deploy Workflow` --references--> `main()`  [EXTRACTED]
  .github/workflows/deploy.yml → build_index.py

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Page Metadata Pipeline (enrich -> meta tags -> posts.json index)** — workflows_enrich_pages_injectthunk, workflows_enrich_pages_meta_tags, build_index_headmetaparser, build_index_posts_json [INFERRED 0.85]
- **Build and Deploy Flow** — build_index_main, package_package, vite_config, workflows_deploy [INFERRED 0.85]
- **Sidebar filtering & sorting controls** — components_searchbar_searchbar, components_sortcontrol_sortcontrol, components_tagfilter_tagfilter, app_app [INFERRED 0.85]
- **Post card rendering pipeline** — app_app, components_cardgrid_cardgrid, components_postcard_postcard, app_post_data_shape [INFERRED 0.85]
- **localStorage-backed preference pattern (theme + sort)** — hooks_usetheme_usetheme, app_getinitialsort, concept_localstorage_persistence [INFERRED 0.85]
- **Graphify Build Pipeline Stages** — graphify_skill_detect, graphify_skill_ast_extraction, graphify_skill_semantic_extraction, graphify_skill_cluster, graphify_skill_graph_json [EXTRACTED 0.90]
- **Graph Database Exports** — exports_neo4j, exports_falkordb, exports_mcp_server [INFERRED 0.80]
- **Graph Query Interface** — query_bfs_dfs, query_shortest_path, query_explain, query_networkx_fallback [EXTRACTED 0.85]
- **Claude Code Developer Workflow Articles** — pages_agentic_engineering, pages_dynamic_workflows, pages_claude_code_sessions, pages_claude_prompting_guide [INFERRED 0.80]
- **Claude Code Config for 3D Web Projects** — pages_claude_3d_web_app, pages_claude_md_kit, pages_react_three_fiber, pages_project_memory [INFERRED 0.80]
- **Static Site Build and Deploy Pipeline** — plan_build_index_py, plan_posts_json, plan_vite_react, plan_github_actions, plan_github_pages [EXTRACTED 0.90]
- **Claude AI Coding Workflows** — pages_ultracode_research_ultracode, pages_vibe_coding_workflow_multi_agent, pages_graphify_guide_claude_code, pages_theory_of_code_ai_engineering [INFERRED 0.80]
- **Persistent Knowledge Systems** — pages_llm_wiki_summary_markdown_wiki, pages_llm_wiki_implementation_v2_llm_wiki, pages_graphify_guide_knowledge_graph [INFERRED 0.75]
- **Static-Site HTML Publishing Stack** — pages_hosting_htmls_on_static_site_github_pages, pages_hosting_htmls_on_static_site_github_actions, pages_hosting_htmls_on_static_site_json_manifest, pages_hosting_htmls_on_static_site_client_side_search [EXTRACTED 1.00]
- **Cover Image Idea-Network Design Series** — archive_cover_img_v01_cover, archive_cover_img_v02_cover, archive_cover_img_v03_cover, archive_cover_img_v04_cover, archive_cover_img_v05_cover, archive_cover_img_v06_cover, archive_cover_img_v07_cover, archive_cover_img_v08_cover [INFERRED 0.85]
- **Cover Image Design Series (v09 through v14)** — archive_cover_img_v09_design, archive_cover_img_v10_design, archive_cover_img_v11_design, archive_cover_img_v12_design, archive_cover_img_v13_design, public_cover_img_v14_design [INFERRED 0.85]

## Communities (23 total, 1 thin omitted)

### Community 0 - "Graphify Skill Pipeline"
Cohesion: 0.08
Nodes (36): Watch Debounce, graphify add (ingest URL), Add & Watch Reference, Folder Watcher (--watch), graphify, Graphify Skill Trigger, Project graphify Usage Rules, graphify clone (+28 more)

### Community 1 - "Build & Package Config"
Cohesion: 0.08
Nodes (26): _load_existing, _load_existing(), main(), _parse_file(), posts.json Index, keywords meta -> a clean, de-duplicated, order-preserving tag list., Optional merge: keep hand-curated fields for files already in posts.json., _split_tags() (+18 more)

### Community 2 - "React UI Components"
Cohesion: 0.13
Nodes (18): App, getInitialSort, Post data shape (title/description/tags/date/file), posts.json manifest, CardGrid(), GitHubLink(), formatDate(), PostCard() (+10 more)

### Community 3 - "Page Metadata Enrichment"
Cohesion: 0.10
Nodes (16): _parse_file, _split_tags, HeadMetaParser, Pull <title> text and relevant <meta name=...> content out of <head>., HTMLParser, analyses, ANALYZE_SCHEMA, analyzeThunk() (+8 more)

### Community 4 - "AI Coding Philosophy"
Cohesion: 0.12
Nodes (16): Claude Code, The Theory of Code: The Last Software Engineering Skill, AI-Era Engineering, Mental Models, Theory of Code, Claude Code "ultracode" — Research Report, Multi-Agent Orchestration, Ultracode Setting (+8 more)

### Community 5 - "Semantic Extraction Spec"
Cohesion: 0.15
Nodes (13): Semantic Extraction Cache, Gemini Extraction Backend, God Nodes, Honesty Rules (EXTRACTED/INFERRED/AMBIGUOUS), Semantic Extraction (Subagents), Extraction Subagent Spec, Confidence Score Rubric, Hyperedges Concept (+5 more)

### Community 6 - "Project Plan & Overview"
Cohesion: 0.21
Nodes (13): Oat Garden HTML Collection Index Page, build_index.py Indexer, Searchable Tag-Grouped Card Grid, Fuse.js Fuzzy Search, GitHub Actions Deploy Workflow, GitHub Pages, HTML Meta Tag Metadata Source of Truth, posts.json (+5 more)

### Community 7 - "Knowledge Graph & LLM Wiki"
Cohesion: 0.17
Nodes (13): The Complete Graphify Guide — Codebase Knowledge Graphs, Antigravity, Graphify, Codebase Knowledge Graph, Tree-sitter, Implementing Karpathy's LLM Wiki — Scenarios, Stack & Wiring, LLM Wiki, Obsidian (+5 more)

### Community 8 - "Agentic Engineering Workflows"
Cohesion: 0.20
Nodes (11): Matt Van Horn's Agentic Engineering Workflow, Sessions & Context — Claude Code, /clear Command, Compound Engineering, Context Window Management, Dynamic Workflows in Claude Code Field Guide, Orchestration Scripts (Fan-Out), Parallel Claude Code Sessions (+3 more)

### Community 9 - "Claude Projects & Memory"
Cohesion: 0.24
Nodes (11): Bun, Claude Code in a 3D Web App Field Manual, CLAUDE.md Starter Kit, Claude Projects, NotebookLM's Equivalent in the Claude Ecosystem, Claude Code Skills, Next.js, Google NotebookLM (+3 more)

### Community 10 - "Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, @types/react, @types/react-dom (+2 more)

### Community 11 - "Graph Export Formats"
Cohesion: 0.25
Nodes (9): Wiki index.md Navigation, Token Reduction Benchmark, FalkorDB Export, GraphML Export, MCP stdio Server, Neo4j Export, Exports & Benchmark Reference, SVG Export (+1 more)

### Community 12 - "Cover Art: Network Series"
Cohesion: 0.25
Nodes (8): Cover Image v01 - Idea Network, Cover Image v02 - Idea Network, Cover Image v03 - Idea Network, Cover Image v04 - Idea Network, Cover Image v05 - Idea Network, Cover Image v06 - Idea Network, Cover Image v07 - Idea Network, Cover Image v08 - Idea Network

### Community 13 - "Cover Art: Gradient & Branding"
Cohesion: 0.25
Nodes (8): Cover Image v09 (gradient design variant), Cover Image v10 (gradient design variant), Cover Image v11 (gradient design variant), Cover Image v12 (gradient design variant), Cover Image v13 (gradient design variant), Cover Image v14 (active cover, purple-blue gradient blobs), Site Favicon (purple zig-zag bolt logo), Icon Sprite Sheet (social and UI icons)

### Community 14 - "Enrich-Pages Command"
Cohesion: 0.40
Nodes (6): build_index.py, enrich-pages Command, HTML Meta Tags (description/keywords/date), posts.json Index, Analyze-Curate-Inject Workflow, enrich-pages Workflow

### Community 15 - "Static Site Hosting"
Cohesion: 0.40
Nodes (5): Hosting a Growing HTML Collection · A Static-Site Guide, Client-Side Search, GitHub Actions, GitHub Pages, JSON Manifest

### Community 16 - "3D Web App Research"
Cohesion: 0.40
Nodes (5): Optimal Structure for a Multi-Page Interactive 3D Web App, Next.js, React Three Fiber, Three.js, WebGL Canvas

### Community 17 - "Data Viz App Research"
Cohesion: 0.50
Nodes (5): Research Output: Dash + Plotly Data Viz App, Anthropic SDK, Dash, MCP Servers, Plotly

### Community 18 - "Claude Context Switching"
Cohesion: 0.50
Nodes (4): Claude Context Switcher (Marathon style), Claude Code Account Context Switching, macOS Keychain, Windows DPAPI

### Community 19 - "Marathon Style Study"
Cohesion: 0.50
Nodes (4): Research Summary — Distilling Website Style with Claude, Visual Design System, Design Tokens, Web Scraping

### Community 20 - "Graphify Settings Hooks"
Cohesion: 1.00
Nodes (3): Claude Settings Hooks, Graphify Grep PreToolUse Hook, Graphify Read/Glob PreToolUse Hook

### Community 21 - "Git Worktree"
Cohesion: 0.67
Nodes (3): Git Worktree vs Branches — A Practical Guide, Git Version Control, Git Worktree

## Knowledge Gaps
- **92 isolated node(s):** `meta`, `FILES`, `ANALYZE_SCHEMA`, `CURATE_SCHEMA`, `INJECT_SCHEMA` (+87 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `main()` connect `Build & Package Config` to `Page Metadata Enrichment`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `graphify Skill` connect `Graphify Skill Pipeline` to `Graph Export Formats`, `Semantic Extraction Spec`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `_parse_file` connect `Page Metadata Enrichment` to `Build & Package Config`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `App` (e.g. with `Post data shape (title/description/tags/date/file)` and `ThemeToggle()`) actually correct?**
  _`App` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `meta`, `FILES`, `ANALYZE_SCHEMA` to the rest of the system?**
  _99 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Graphify Skill Pipeline` be split into smaller, more focused modules?**
  _Cohesion score 0.08412698412698413 - nodes in this community are weakly interconnected._
- **Should `Build & Package Config` be split into smaller, more focused modules?**
  _Cohesion score 0.08045977011494253 - nodes in this community are weakly interconnected._