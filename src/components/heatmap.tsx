const WEEKS = 53;
const DAYS = 7;

const HEAT_CLASS = [
  "bg-heat-0",
  "bg-heat-1",
  "bg-heat-2",
  "bg-heat-3",
  "bg-heat-4",
] as const;

/**
 * A 5-row pixel font, just wide enough to spell the product name across a
 * year of contribution cells.
 *
 * Uppercase only: at five pixels tall, lowercase forms with ascenders and
 * descenders are unreadable, and contribution art is conventionally set in
 * caps anyway. Each glyph is its own width so the whole word fits inside 53
 * columns rather than being clipped.
 */
const GLYPHS: Record<string, string[]> = {
  T: ["###", ".#.", ".#.", ".#.", ".#."],
  Y: ["#.#", "#.#", ".#.", ".#.", ".#."],
  P: ["##.", "#.#", "##.", "#..", "#.."],
  E: ["###", "#..", "##.", "#..", "###"],
  F: ["###", "#..", "##.", "#..", "#.."],
  L: ["#..", "#..", "#..", "#..", "###"],
  O: ["###", "#.#", "#.#", "#.#", "###"],
  W: ["#...#", "#...#", "#.#.#", "#.#.#", ".#.#."],
  A: [".#.", "#.#", "###", "#.#", "#.#"],
  I: ["###", ".#.", ".#.", ".#.", "###"],
  " ": ["..", "..", "..", "..", ".."],
};

const WORD = "TYPEFLOW AI";

/** Column offsets of every lit cell, keyed as `col:row`. */
function renderWord(): { lit: Set<string>; width: number } {
  const widths = [...WORD].map((c) => GLYPHS[c][0].length);
  // One blank column between glyphs.
  const width = widths.reduce((a, b) => a + b, 0) + (WORD.length - 1);
  const startCol = Math.max(0, Math.floor((WEEKS - width) / 2));
  // Five rows of type inside a seven-row grid leaves one quiet row above and
  // one below, so the word is not jammed against the edges.
  const startRow = 1;

  const lit = new Set<string>();
  let col = startCol;
  for (const char of WORD) {
    const glyph = GLYPHS[char];
    for (let r = 0; r < glyph.length; r += 1) {
      for (let c = 0; c < glyph[r].length; c += 1) {
        if (glyph[r][c] === "#") lit.add(`${col + c}:${startRow + r}`);
      }
    }
    col += glyph[0].length + 1;
  }
  return { lit, width };
}

const { lit } = renderWord();

/**
 * Deterministic, not random, so the markup is identical on the server and the
 * client and stable across builds.
 *
 * Lit cells take the top of the ramp with a little variation, so the word
 * does not read as a flat stencil. Everything else stays sparse and quiet —
 * enough activity to look like a real year, never enough to compete with the
 * letters.
 *
 * This is NOT user data, and the site could not show any: the whole point of
 * the product is that the data never leaves the machine. The caption says so.
 */
function levels(): number[] {
  let seed = 20260809;
  const next = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const out: number[] = [];
  for (let i = 0; i < WEEKS * DAYS; i += 1) {
    const col = Math.floor(i / DAYS);
    const row = i % DAYS;
    const r = next();

    if (lit.has(`${col}:${row}`)) {
      // Uniform, not varied: at five pixels tall a glyph stroke that dips a
      // step in the ramp reads as a hole in the letter, not as texture.
      out.push(4);
    } else {
      // Sparse enough to look like a real year without competing with the
      // word — one cell in eleven, and never above the first step.
      out.push(r < 0.91 ? 0 : 1);
    }
  }
  return out;
}

const LEVELS = levels();

/** Contribution-style heatmap of daily activity. */
export function Heatmap() {
  return (
    <figure>
      <div className="scroll-x rounded-control border border-line bg-deep p-4">
        <div
          role="img"
          aria-label={`A year of daily activity, with the busiest days arranged to spell ${WORD}.`}
          className="grid grid-flow-col grid-rows-7 gap-[3px]"
        >
          {LEVELS.map((level, i) => (
            <span
              key={i}
              className={`block h-[11px] w-[11px] rounded-[2px] ${HEAT_CLASS[level]}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <figcaption className="text-micro text-fg-subtle">
          Example &mdash; your data stays on your machine.
        </figcaption>

        {/* The ramp carries a text label at each end, so the scale is never
            conveyed by colour alone. */}
        <div
          aria-hidden="true"
          className="flex items-center gap-1.5 text-micro text-fg-subtle"
        >
          Less
          <span className="flex items-center gap-[3px]">
            {HEAT_CLASS.map((cls) => (
              <span
                key={cls}
                className={`block h-[11px] w-[11px] rounded-[2px] ${cls}`}
              />
            ))}
          </span>
          More
        </div>
      </div>
    </figure>
  );
}
