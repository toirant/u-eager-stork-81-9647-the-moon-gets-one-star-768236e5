// The Moon Gets One Star — a one-star review of the Moon.
//
// The review is a single line of at most 120 characters. It reads like a
// genuine one-star review: a star rating, a specific grievance about the
// Moon itself, and the reason it earned only one star. The joke is Moon-only:
// the full moon turned the reviewer's dog into a werewolf, blamed the tides
// for it, and left — a complaint no other product could carry.
//
// The program writes exactly that line to /output/entry.txt (or to
// $OUTPUT_DIR/entry.txt when set), with no trailing newline, so the file
// holds 109 characters on one line.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REVIEW =
  "★☆☆☆☆ Turned my dog into a werewolf, blamed the tides, and left. One star only because zero is not an option.";

// The gate counts characters, not bytes: count Unicode code points.
const length = [...REVIEW].length;
if (length < 1 || length > 120) {
  throw new Error(`Review must be 1-120 characters, got ${length}`);
}
if (REVIEW.trim().length === 0) {
  throw new Error("Review must not be only whitespace");
}
// One line only: a stray newline would break the "single review" shape.
if (REVIEW.includes("\n")) {
  throw new Error("Review must be a single line");
}

const outputDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), REVIEW, "utf8");
