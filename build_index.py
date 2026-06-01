#!/usr/bin/env python3
"""Scan public/pages/*.html and (re)generate public/posts.json.

Each HTML file is the source of truth for its own metadata: the indexer reads
the <title> and a few <meta name="..."> tags, so posts.json is always fully
reproducible. Run it manually (`python build_index.py`) or let the npm
predev/prebuild hooks run it for you.

Standard library only — no third-party dependencies required.
"""

from __future__ import annotations

import datetime as _dt
import json
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PAGES_DIR = ROOT / "public" / "pages"
OUTPUT = ROOT / "public" / "posts.json"


class HeadMetaParser(HTMLParser):
    """Pull <title> text and relevant <meta name=...> content out of <head>."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.title: str = ""
        self.meta: dict[str, str] = {}
        self._in_title = False
        self._title_done = False
        self._in_head = True  # only trust meta tags found before </head>

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        tag = tag.lower()
        if tag == "title" and not self._title_done:
            self._in_title = True
        elif tag == "meta" and self._in_head:
            a = {k.lower(): (v or "") for k, v in attrs}
            name = a.get("name", "").lower()
            if name and "content" in a:
                # First occurrence wins; don't let body-level duplicates clobber it.
                self.meta.setdefault(name, a["content"].strip())

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()
        if tag == "title":
            self._in_title = False
            self._title_done = True
        elif tag == "head":
            self._in_head = False

    def handle_data(self, data: str) -> None:
        if self._in_title:
            self.title += data


def _split_tags(raw: str) -> list[str]:
    """keywords meta -> a clean, de-duplicated, order-preserving tag list."""
    seen: dict[str, None] = {}
    for part in raw.replace(";", ",").split(","):
        tag = part.strip()
        if tag:
            seen.setdefault(tag, None)
    return list(seen.keys())


def _parse_file(path: Path) -> dict:
    parser = HeadMetaParser()
    parser.feed(path.read_text(encoding="utf-8", errors="replace"))

    title = " ".join(parser.title.split()) or path.stem
    description = parser.meta.get("description", "")
    tags = _split_tags(parser.meta.get("keywords", ""))

    date = parser.meta.get("date", "").strip()
    if not date:
        # Fall back to the file's last-modified date (UTC, YYYY-MM-DD).
        mtime = _dt.datetime.fromtimestamp(path.stat().st_mtime, _dt.timezone.utc)
        date = mtime.strftime("%Y-%m-%d")

    return {
        "file": path.name,
        "title": title,
        "description": description,
        "tags": tags,
        "date": date,
    }


def _load_existing() -> dict[str, dict]:
    """Optional merge: keep hand-curated fields for files already in posts.json."""
    if not OUTPUT.exists():
        return {}
    try:
        data = json.loads(OUTPUT.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return {}
    return {rec["file"]: rec for rec in data if isinstance(rec, dict) and "file" in rec}


def main() -> int:
    if not PAGES_DIR.is_dir():
        print(f"[build_index] no pages directory at {PAGES_DIR}", file=sys.stderr)
        OUTPUT.write_text("[]\n", encoding="utf-8")
        return 0

    existing = _load_existing()
    records: list[dict] = []

    for html_path in sorted(PAGES_DIR.glob("*.html")):
        rec = _parse_file(html_path)
        prev = existing.get(rec["file"], {})
        # Merge: a non-empty parsed value always wins (HTML is source of truth);
        # only fall back to a previously curated value when the file omits it.
        for key in ("description", "date"):
            if not rec[key] and prev.get(key):
                rec[key] = prev[key]
        if not rec["tags"] and prev.get("tags"):
            rec["tags"] = prev["tags"]
        records.append(rec)

    # Newest first; ties broken by title for stable output.
    records.sort(key=lambda r: (r["date"], r["title"]), reverse=True)

    OUTPUT.write_text(json.dumps(records, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"[build_index] wrote {len(records)} record(s) to {OUTPUT.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
