#!/usr/bin/env python3
"""Update imageurls.js so every card uses the latest wiki image version.

Background
----------
The Dominion Strategy Wiki used to host every card image under a stable
``Special:Redirect/file/<Name>.jpg`` URL, which MediaWiki resolves to the
current version of the file (this repo used that until Sep 2026, see commit
a289676 "Added icons to cards chosen for Way of the Mouse/Riverboat/AA").
The wiki has since put its index.php pages behind Anubis (a proof-of-work
bot challenge), and the wiki admins are progressively renaming card images
to ``~English~<year>`` filenames, which breaks the static hashed URLs
stored in imageurls.js.

This script repairs imageurls.js:

1. HEAD-checks every URL in imageurls.js.  The static ``/images/`` files
   are not Anubis-protected, so this is fast and completely safe.
2. For dead URLs it asks the wiki for the file's current name via the
   ``Special:Redirect/file/<Name>.jpg`` endpoint (the original logic).
   If Anubis challenges that request, it falls back to fetching the
   ``File:<Name>.jpg`` page and reading the canonical file name from its
   ``og:image`` meta tag.  Requests are made politely, with delays and
   backoff on Anubis challenges.
3. For anything still unresolved it guesses the ``~English~<year>``
   rename pattern used by the wiki admins (e.g. Catapult_Rocks.jpg ->
   Catapult_Rocks~English~2016.jpg) by HEAD-checking candidate years.
   Static /images/ paths are not Anubis-protected, so this is safe.
4. Rewrites imageurls.js in place, preserving every existing line.
5. Prints a summary of what was fixed and exits non-zero if any URL
   could not be resolved.

Usage:
    python3 update_imageurls.py                 # fix all dead links
    python3 update_imageurls.py --cache FILE    # seed known resolutions
    python3 update_imageurls.py --check-only    # just report dead links
"""

import argparse
import hashlib
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), "imageurls.js")
WIKI = "https://wiki.dominionstrategy.com"
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/126.0 Safari/537.36"
INDEX_DELAY = 1.2        # polite delay between index.php requests (seconds)
HEAD_DELAY = 0.3         # delay between HEAD checks of static files
ANUBIS_BACKOFF = [10, 25, 60, 120, 300]  # backoff on Anubis challenges
YEARS = range(2008, 2027)  # candidate years for ~English~<year> renames

def md5_dir(filename):
    """MediaWiki stores uploads in a 2-level dir from the md5 of the name."""
    h = hashlib.md5(filename.encode("utf-8")).hexdigest()
    return h[:1], h[:2]


def head(url):
    """HEAD request -> HTTP status code (or None on network error)."""
    req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return e.code
    except Exception:
        return None


def get(url):
    """GET request -> (status, body) or (None, error) on network error."""
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status, r.read()
    except urllib.error.HTTPError as e:
        try:
            return e.code, e.read()
        except Exception:
            return e.code, b""
    except Exception as e:
        return None, str(e).encode()


def is_anubis(body):
    body = body.decode("utf-8", "replace")
    return "Making sure you're not a bot" in body or "anubis" in body.lower()


def wiki_image_url(filename):
    d1, d2 = md5_dir(filename)
    return f"{WIKI}/images/{d1}/{d2}/{urllib.parse.quote(filename)}"


def resolve_via_special_redirect(name):
    """The old logic: Special:Redirect/file/<Name>.jpg.

    Returns the canonical image URL, or None if Anubis/blocked/unavailable.
    """
    url = f"{WIKI}/index.php/Special:Redirect/file/{urllib.parse.quote(name)}"
    status, body = get(url)
    if status is None:
        return None
    if status == 200:
        if is_anubis(body):
            return None
        # Serving the file directly is what we want when the file exists.
        if body[:3] == b"\xff\xd8\xff":
            return url
        return None
    return None




def resolve_via_file_page(name, max_tries=5):
    """Fetch File:<name>.jpg and read the canonical name from og:image."""
    page = f"{WIKI}/index.php/File:{urllib.parse.quote(name)}"
    for attempt in range(max_tries):
        status, body = get(page)
        if status is None:
            return None
        if status == 200 and not is_anubis(body):
            m = re.search(r'og:image" content="([^"]+)"', body.decode("utf-8", "replace"))
            if not m:
                return None
            og = m.group(1)
            if "/images/thumb/" in og:
                seg = og.split("/images/thumb/", 1)[-1]
                parts = seg.split("/", 2)
                if len(parts) < 3:
                    return None
                canonical = urllib.parse.unquote(parts[2].split("/")[0])
            elif "/images/" in og:
                canonical = urllib.parse.unquote(og.split("/images/", 1)[-1].split("/")[-1])
            else:
                return None
            return wiki_image_url(canonical)
        if status == 404:
            return None
        # Anubis challenge (or transient) -- back off politely.
        wait = ANUBIS_BACKOFF[min(attempt, len(ANUBIS_BACKOFF) - 1)]
        print(f"    anubis challenge, backing off {wait}s ...", flush=True)
        time.sleep(wait)
    return None


def resolve_via_year_guess(name):
    """Try <base>~English~<year>.jpg for each candidate year (HEAD only)."""
    base = name.rsplit(".", 1)[0]
    if "~English~" in base:
        return None  # already in the new format; nothing to guess
    for year in YEARS:
        candidate = f"{base}~English~{year}.jpg"
        url = wiki_image_url(candidate)
        time.sleep(HEAD_DELAY)
        if head(url) == 200:
            return url
    return None

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--cache", help="JSON file of known [slug, oldurl, newurl, note] resolutions")
    ap.add_argument("--check-only", action="store_true", help="only report dead links")
    args = ap.parse_args()

    text = open(SRC, encoding="utf-8").read()
    entries = load_entries(text)
    print(f"loaded {len(entries)} entries from imageurls.js", flush=True)

    known = {}
    if args.cache:
        for slug, old, new, note in json.load(open(args.cache)):
            if new:
                known[old] = new
        print(f"seeded {len(known)} resolutions from cache", flush=True)

    # 1. find dead links
    dead = []
    for slug, url in entries:
        status = head(url)
        if status != 200:
            dead.append((slug, url, status))
        time.sleep(HEAD_DELAY)
    print(f"dead links: {len(dead)}", flush=True)
    for slug, url, status in dead:
        print(f"  {status} {slug}", flush=True)

    if args.check_only:
        sys.exit(1 if dead else 0)

    # 2. resolve dead links
    fixes = {}      # old_url -> new_url
    for slug, url, status in dead:
        name = urllib.parse.unquote(url.rsplit("/", 1)[-1])
        print(f"resolving {slug} ({name}) ...", flush=True)
        new_url = None

        if url in known:
            new_url = known[url]
            if head(new_url) != 200:
                print("    cached URL not 200, re-resolving", flush=True)
                new_url = None

        if not new_url:
            new_url = resolve_via_special_redirect(name)
            if new_url:
                print(f"    special:redirect -> {new_url}", flush=True)

        if not new_url:
            new_url = resolve_via_file_page(name)
            if new_url:
                print(f"    file page -> {new_url}", flush=True)
            time.sleep(INDEX_DELAY)

        if not new_url:
            new_url = resolve_via_year_guess(name)
            if new_url:
                print(f"    year guess -> {new_url}", flush=True)

        if new_url and head(new_url) == 200:
            fixes[url] = new_url
            print(f"    OK {new_url}", flush=True)
        else:
            print("    FAILED", flush=True)
        time.sleep(INDEX_DELAY)

    # 3. rewrite imageurls.js atomically
    for old, new in fixes.items():
        text = text.replace(old, new)
    if fixes:
        tmp = SRC + ".tmp"
        with open(tmp, "w", encoding="utf-8") as f:
            f.write(text)
        os.replace(tmp, SRC)
        print(f"rewrote imageurls.js with {len(fixes)} fixes", flush=True)

    # 4. verify
    print("verifying ...", flush=True)
    still_dead = []
    for slug, url in load_entries(open(SRC, encoding="utf-8").read()):
        if head(url) != 200:
            still_dead.append((slug, url))
        time.sleep(HEAD_DELAY)
    print(f"fixed {len(fixes)}, still dead {len(still_dead)}", flush=True)
    for slug, url in still_dead:
        print(f"  STILL DEAD {slug} {url}", flush=True)

    sys.exit(1 if still_dead else 0)


def load_entries(text):
    return re.findall(r'"([^"]+)":\s*"(https://wiki\.dominionstrategy\.com/images/[^"]+)"', text)


if __name__ == "__main__":
    main()
