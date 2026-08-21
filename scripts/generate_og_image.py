"""
Regenerate the Open Graph / Twitter share card.

The card used to be a hand-made PNG with no regeneration path, so when the
project was renamed TypeFlow -> DictateFlow the image kept the old brand for
every share. To stop that recurring, this script reads its text straight from
the source of truth:

    brand + tagline   src/config/site.ts
    headline          src/components/sections/hero.tsx  (the <h1>)

so the card cannot drift from the site again. Re-run it after changing either.

    py -3 scripts/generate_og_image.py

Fonts are the two Latin subsets next/font already emits into `out/`, so the
card uses the real IBM Plex Sans / JetBrains Mono rather than a lookalike.
Run `npm run build` at least once before running this.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "src" / "app"
BUILD_MEDIA = ROOT / "out" / "_next" / "static" / "media"

W, H = 1200, 630
PAD = 72

# Sampled from the previous card so the visual identity is unchanged.
BG = (241, 241, 244)
WHITE = (255, 255, 255)
INK = (24, 24, 27)
MUTED = (113, 113, 122)
BORDER = (228, 228, 231)
AMBER = (251, 191, 36)
INDIGO = (79, 70, 229)


def read_source_text() -> tuple[str, str, str]:
    """Pull brand, tagline and headline out of the TSX/TS sources."""
    site = (ROOT / "src" / "config" / "site.ts").read_text(encoding="utf-8")
    brand = re.search(r'name:\s*"([^"]+)"', site).group(1)
    tagline = re.search(r'tagline:\s*"([^"]+)"', site).group(1)

    hero = (ROOT / "src" / "components" / "sections" / "hero.tsx").read_text(encoding="utf-8")
    h1 = re.search(r"<h1[^>]*>(.*?)</h1>", hero, re.S).group(1)
    headline = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", h1)).strip()
    return brand, tagline, headline


def load_fonts(needed: str) -> tuple[Path, Path]:
    """
    Un-compress the woff2 Latin subsets into usable TTFs.

    next/font emits one file per unicode-range, and the Latin one is not
    reliably the largest: IBM Plex Sans ships a 293-glyph Cyrillic subset that
    is wider than its 270-glyph Latin. Picking by size renders tofu, so each
    candidate is scored on whether its cmap actually covers the text.
    """
    if not BUILD_MEDIA.is_dir():
        sys.exit(f"missing {BUILD_MEDIA} - run `npm run build` first")

    tmp = ROOT / ".og-fonts"
    tmp.mkdir(exist_ok=True)
    want = {ord(c) for c in needed}
    best: dict[str, tuple[int, Path]] = {}

    for woff in BUILD_MEDIA.glob("*.woff2"):
        f = TTFont(woff)
        full = next((r.toUnicode() for r in f["name"].names if r.nameID == 4), "")
        family = "mono" if "JetBrains" in full else "sans" if "Plex" in full else None
        if not family:
            continue
        covered = len(want & set(f.getBestCmap()))
        if covered > best.get(family, (0, None))[0]:
            dst = tmp / f"{family}.ttf"
            f.flavor = None
            f.save(dst)
            best[family] = (covered, dst)

    for family in ("sans", "mono"):
        if family not in best:
            sys.exit(f"no {family} font found in {BUILD_MEDIA}")
        covered, _ = best[family]
        if covered < len(want):
            sys.exit(f"{family} subset covers {covered}/{len(want)} needed characters")
    return best["sans"][1], best["mono"][1]


def fit_headline(text: str, font_path: Path, max_w: int) -> tuple[ImageFont.FreeTypeFont, list[str]]:
    """Largest size at which the headline wraps into at most three lines."""
    probe = ImageDraw.Draw(Image.new("RGB", (1, 1)))
    for size in range(64, 30, -2):
        font = ImageFont.truetype(str(font_path), size)
        lines, cur = [], ""
        for word in text.split():
            trial = f"{cur} {word}".strip()
            if probe.textlength(trial, font=font) <= max_w:
                cur = trial
            else:
                lines.append(cur)
                cur = word
        lines.append(cur)
        if len(lines) <= 3 and all(probe.textlength(l, font=font) <= max_w for l in lines):
            return font, lines
    raise SystemExit("headline will not fit")


def keycap(d: ImageDraw.ImageDraw, x: int, y: int, label: str, font) -> int:
    """Amber keycap with the darker under-edge, matching <Kbd> on the page."""
    tw = d.textlength(label, font=font)
    w, h = int(tw) + 36, 46
    d.rounded_rectangle([x, y + 4, x + w, y + h + 4], radius=8, fill=INK)      # shadow edge
    d.rounded_rectangle([x, y, x + w, y + h], radius=8, fill=AMBER, outline=INK, width=2)
    d.text((x + w / 2, y + h / 2), label, font=font, fill=INK, anchor="mm")
    return x + w


def build() -> None:
    brand, tagline, headline = read_source_text()
    footer = f"{tagline.rstrip('.')} · MIT"
    sans_path, mono_path = load_fonts(
        brand + headline + footer + "Ctrl Win + hold, speak, release"
    )

    f_brand = ImageFont.truetype(str(sans_path), 27)
    f_small = ImageFont.truetype(str(sans_path), 22)
    f_key = ImageFont.truetype(str(mono_path), 22)
    f_head, lines = fit_headline(headline, mono_path, W - PAD * 2)

    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    # --- brand lockup -----------------------------------------------------
    # The real mark, not a redrawn approximation: that is what drifted last time.
    mark = Image.open(ROOT / "public" / "logo.png").convert("RGBA").resize((40, 40), Image.LANCZOS)
    img.paste(mark, (PAD, 69), mark)
    d.text((PAD + 54, 89), brand, font=f_brand, fill=INK, anchor="lm", stroke_width=1, stroke_fill=INK)

    # --- headline ---------------------------------------------------------
    line_h = f_head.size + 18
    top = 300 - (len(lines) * line_h) // 2
    for i, line in enumerate(lines):
        d.text((PAD, top + i * line_h), line, font=f_head, fill=INK)

    # --- the empty field the words land in --------------------------------
    box_y = 452
    d.rounded_rectangle([PAD, box_y, W - PAD, box_y + 66], radius=10, fill=WHITE, outline=BORDER, width=2)
    d.line([PAD + 26, box_y + 20, PAD + 26, box_y + 46], fill=INDIGO, width=3)   # caret

    # --- footer row -------------------------------------------------------
    fy = 556
    x = keycap(d, PAD, fy, "Ctrl", f_key)
    d.text((x + 14, fy + 23), "+", font=f_small, fill=MUTED, anchor="lm")
    x = keycap(d, x + 34, fy, "Win", f_key)
    d.text((x + 22, fy + 23), "hold, speak, release", font=f_small, fill=MUTED, anchor="lm")
    d.text((W - PAD, fy + 23), footer, font=f_small, fill=MUTED, anchor="rm")

    for name in ("opengraph-image.png", "twitter-image.png"):
        img.save(OUT_DIR / name, "PNG", optimize=True)
        print(f"  wrote {name}  {(OUT_DIR / name).stat().st_size / 1024:.1f} KB")

    alt = (f'{brand}: the headline "{headline}" above an empty text field with a '
           f"blinking caret, and the Ctrl and Win keycaps.")
    for name in ("opengraph-image.alt.txt", "twitter-image.alt.txt"):
        (OUT_DIR / name).write_text(alt + "\n", encoding="utf-8")
        print(f"  wrote {name}")

    print(f"\nbrand:    {brand}\nheadline: {headline}\nlines:    {lines}")


if __name__ == "__main__":
    build()
