export const tool = {
  summary: "Replay every kept reading case and report what the reading answers now",
  path: "seat turn-end cases",
} as const

import { readFileSync, readdirSync } from "node:fs"
import { fileStemOf } from "../page/name/name"
import { parseFrontmatter, textField } from "../page/frontmatter.ts"
import { LOGICAL_MODELS, type LogicalModel } from "./lib/model-vocab.ts"
import { AKASHA, resolveRoots, rootFor } from "../repo/roots/roots"
import { conductIn } from "./lib/turn-end-reading-conduct.ts"
import { DEFAULT_READING_MODEL, labelSettled, readingOn } from "./lib/turn-end-reading.ts"

const HELP = `bun tools/turn-end-reading-cases.ts — replay every kept reading case

Takes each case under \`pages/seat-turn-end-reading-case/\`, hands the reading exactly the evidence
that case keeps, and reports what it answers against the verdict the case says it is owed.

A CASE IS KEPT ON ITS VERDICT, AND THE VERDICT IS THE WHOLE ANSWER. The reading answers one
question rather than picking from a list, so there is nothing else to pin it on. What it said
is printed beside the verdict, because that is how you tell WHY a turn was refused.

THIS IS A MEASUREMENT, NOT A TEST. It calls a model, so it costs and it varies. A case that
answers differently from one run to the next is telling you the questions are ambiguous on it,
which is worth knowing rather than worth hiding behind a retry.

IT REPLAYS FROM THE CASE, NOT FROM THE TRANSCRIPT. A case keeps the prompt and the final
message it was cut from, so it goes on answering after the transcript it names has rolled away.

THE TIMEOUT IS LONGER THAN THE HOOK'S. In the hook the reading has to answer inside the turn
end, and a slow answer is one nobody waits for. Here nothing is waiting, and a timeout that
fires reports an unsettled case rather than a wrong one.

Usage:
  bun tools/turn-end-reading-cases.ts [flags]

  --case <stem>     Replay only the case with this file stem. Repeatable.
  --times <n>       Replay each case this many times. Default ${String(1)}.
  --model <tier>    Which tier reads. Default \`${DEFAULT_READING_MODEL}\`.
  --timeout-ms <n>  Abort each call after this long. Default ${String(30_000)}.
  --help            This.

Exit codes:
  0  every run reached the verdict its case is owed
  1  nothing was measured: every run came back unsettled
  2  at least one run reached the other verdict
`

const CASE_TIMEOUT_MS = 30_000

const CASES_PATH = "pages/seat-turn-end-reading-case"

interface KeptCase {
  readonly stem: string
  readonly pending: boolean
  readonly toolCalls: number
  readonly want: string
  readonly promptText: string | null
  readonly finalText: string
}

function bodyOf(text: string): string {
  const whole = text.replace(/\r\n/g, "\n")
  if (!whole.startsWith("---\n")) return whole
  const closes = whole.indexOf("\n---\n", 4)
  return closes === -1 ? whole : whole.slice(closes + 5)
}

function sectionOf(body: string, heading: string): string {
  const lines = body.split("\n")
  const at = lines.indexOf(`# ${heading}`)
  if (at === -1) return ""
  const below = lines.slice(at + 1)
  const ends = below.findIndex((line) => line.startsWith("# "))
  return (ends === -1 ? below : below.slice(0, ends)).join("\n").trim()
}

function keptCaseFrom(stem: string, text: string): KeptCase | null {
  const fm = parseFrontmatter(text)
  const want = textField(fm, "verdict")
  const toolCalls = Number(textField(fm, "tool-calls"))
  const finalText = sectionOf(bodyOf(text), "Final Message")
  if (want === null || finalText === "" || !Number.isFinite(toolCalls)) return null
  const promptText = sectionOf(bodyOf(text), "Prompt")
  return {
    stem,
    pending: textField(fm, "pending") === "true",
    toolCalls,
    want,
    promptText: promptText === "" ? null : promptText,
    finalText,
  }
}

function keptCases(root: string, only: readonly string[]): readonly KeptCase[] {
  const where = `${root}/${CASES_PATH}`
  const named = readdirSync(where)
    .filter((name) => name.endsWith(".md"))
    .map((name) => ({ stem: fileStemOf(name), name }))
    .filter(({ stem }) => only.length === 0 || only.includes(stem))
    .sort((a, b) => a.stem.localeCompare(b.stem))
  return named.flatMap(({ stem, name }) => {
    const kept = keptCaseFrom(stem, readFileSync(`${where}/${name}`, "utf8"))
    return kept === null ? [] : [kept]
  })
}

function valueOf(argv: readonly string[], flag: string): string | null {
  const at = argv.indexOf(flag)
  return at === -1 ? null : (argv[at + 1] ?? "")
}

function valuesOf(argv: readonly string[], flag: string): readonly string[] {
  return argv.flatMap((one, at) => (one === flag ? [argv[at + 1] ?? ""] : []))
}

function numberOf(argv: readonly string[], flag: string, fallback: number): number {
  const said = valueOf(argv, flag)
  if (said === null) return fallback
  const parsed = Number(said)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

function modelOf(argv: readonly string[]): LogicalModel | null {
  const said = valueOf(argv, "--model")
  if (said === null) return DEFAULT_READING_MODEL
  const found = LOGICAL_MODELS.find((one) => one === said)
  return found ?? null
}

async function main(argv: readonly string[]): Promise<number> {
  if (argv.includes("--help")) {
    process.stdout.write(HELP)
    return 0
  }
  const model = modelOf(argv)
  if (model === null) {
    process.stderr.write(`refused: --model must be one of ${LOGICAL_MODELS.join(", ")}\n`)
    return 1
  }
  const root = rootFor(resolveRoots(), AKASHA)
  const cases = keptCases(root, valuesOf(argv, "--case"))
  if (cases.length === 0) {
    process.stderr.write(`refused: no case to replay under ${root}/${CASES_PATH}\n`)
    return 1
  }
  const times = numberOf(argv, "--times", 1)
  const timeoutMs = numberOf(argv, "--timeout-ms", CASE_TIMEOUT_MS)

  let asKept = 0
  let differing = 0
  let unsettled = 0

  const conduct = conductIn(root)

  for (const kept of cases) {
    for (let run = 0; run < times; run += 1) {
      const reading = await readingOn({
        conduct,
        evidence: {
          finalText: kept.finalText,
          promptText: kept.promptText,
          pending: kept.pending,
          toolCalls: kept.toolCalls,
          trail: [],
        },
        model,
        timeoutMs,
      })
      const verdict = !labelSettled(reading.label)
        ? "unsettled"
        : reading.label === kept.want
          ? "as kept"
          : "DIFFERS"
      if (verdict === "unsettled") unsettled += 1
      else if (verdict === "as kept") asKept += 1
      else differing += 1
      process.stdout.write(
        `${kept.stem.padEnd(38)} owed ${kept.want.padEnd(7)} got ${reading.label.padEnd(30)} ${verdict}` +
          `${reading.why === "" ? "" : `  — ${reading.why}`}\n`
      )
    }
  }

  process.stdout.write(
    `\n${String(cases.length)} case(s), ${String(times)} run(s) each: ` +
      `${String(asKept)} as kept, ${String(differing)} differing, ${String(unsettled)} unsettled\n`
  )
  if (differing > 0) return 2
  return asKept === 0 ? 1 : 0
}

process.exitCode = await main(process.argv.slice(2))
