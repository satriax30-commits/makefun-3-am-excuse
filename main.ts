// main.ts — "The 3 AM Excuse"
// make.fun bounty: u-hazel-walrus-38-4764-the-3-am-excuse-c1017878
//
// A hardware wallet, in its own voice, refuses to sign a transaction at
// 3 AM. This program writes that one refusal — a single line, under 200
// characters — to <output-dir>/entry.txt (default /output, where the
// grader looks for it).
//
// Fully deterministic: no network access, no clock reads, no randomness.
// Node 22, standard library only.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The refusal itself. The wallet is not tired, flat, or updating: it
// remembers. It has watched its owner buy the dip at 3 AM three times
// already, and every morning it takes the blame — so tonight the device
// answers back. Memory and grudge, not a battery or a firmware update.
const WALLET_LINE =
  "It's 3 AM. I've watched you buy the dip at this hour three times, and every single morning you blame me. Not tonight.";

// The sealed gate: /output/entry.txt must hold UTF-8 text of 1 to 200
// characters, not only whitespace, on exactly one line. Anything outside
// the gate never reaches the file.
function checkGate(line: string): void {
  const chars = [...line].length; // count code points, not UTF-16 units
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters, outside the 1-200 gate`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (line !== line.trim()) {
    throw new Error("entry has leading or trailing whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be one line, not several");
  }
}

// The brief's own terms, checked before anything is written: the line has
// to name the hour, speak as the device ("I" / "my"), and refuse — a
// wallet that merely describes the night is not giving an excuse.
function checkVoice(line: string): void {
  if (!line.includes("3 AM")) {
    throw new Error("entry never names the hour it refuses to sign at");
  }
  if (!/\b(I|I've|my)\b/.test(line)) {
    throw new Error("entry does not speak in the wallet's own voice");
  }
  if (!/not tonight/i.test(line)) {
    throw new Error("entry never actually refuses");
  }
}

function run(): void {
  // A first argument may name another output directory (handy for local
  // checks); the grader passes none and gets /output/entry.txt.
  const outDir = process.argv[2] ?? "/output";

  checkGate(WALLET_LINE);
  checkVoice(WALLET_LINE);

  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  // Written exactly as-is, with no trailing newline: the gate counts the
  // whole file, so the file is the line and nothing else.
  writeFileSync(outPath, WALLET_LINE, "utf8");

  // Read it back and demand byte-identical content that still passes both
  // checks; a mismatch means the disk disagrees with the validated line.
  const onDisk = readFileSync(outPath, "utf8");
  if (onDisk !== WALLET_LINE) {
    throw new Error("read-back mismatch: entry.txt is not the validated line");
  }
  checkGate(onDisk);
  checkVoice(onDisk);

  console.log(`wrote ${outPath} (${[...WALLET_LINE].length} chars)`);
}

run();
