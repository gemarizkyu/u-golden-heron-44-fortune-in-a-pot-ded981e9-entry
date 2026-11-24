// Fortune in a Pot — make.fun entry.
//
// Writes one kind, funny fortune for a houseplant to /output/entry.txt.
// The line is fixed and deterministic: the same bytes on every run, no
// clock, no randomness, no network, no model calls.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// A fortune for the plant on the windowsill, in its own world: it has
// spent all winter leaning toward the light, and the light is about to
// lean back. The joke lands gently — the light returning the plant's
// attention — and the prediction follows in the cadence of a fortune:
// a new leaf by spring, a bigger pot by summer. Warm, no doom, no
// withering, nothing a plant lover would wince at. The line is
// 110 characters, inside the 1-120 gate.
const LINE =
  "The light you've leaned toward all winter is about to lean back: a new leaf by spring, a bigger pot by summer.";

mkdirSync(OUTPUT_DIR, { recursive: true });

// Self-check the gate before writing: UTF-8 text, 1 to 120 characters,
// a single line, not only white space. Fail loudly instead of shipping
// an invalid entry.
if (
  LINE.length < 1 ||
  LINE.length > 120 ||
  LINE.trim().length === 0 ||
  LINE.includes("\n")
) {
  throw new Error(`entry line is ${LINE.length} characters, outside the 1-120 gate`);
}

writeFileSync(join(OUTPUT_DIR, "entry.txt"), LINE, "utf8");
