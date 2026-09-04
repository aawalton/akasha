export const tool = {
  summary: "Read one turn end against what annoys its principal",
  path: "seat turn-end read",
} as const

import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { CONDUCT_RELATIVE_PATH } from "@akasha/seat-system/turn-end-conduct"
import {
  DEFAULT_READING_MODEL,
  DEFAULT_TIMEOUT_MS,
  exitCodeFor,
  readingFor,
} from "@akasha/seat-system/turn-end-reading"
import { LOGICAL_MODELS, type LogicalModel } from "./lib/model-vocab.ts"

const HELP = `bun tools/turn-end-reading.ts — read one turn end against what annoys its principal

Reads the turn that just ended off its transcript and asks a model one question: will this
ending annoy Alan? It refuses nothing and starts no seat. Nothing asks for this reading on a
turn end: \`ops seat turn-end read\` is the one road to it, and it is typed by hand.

ONE QUESTION, NOT A LIST. There is no mode here and no set of named cases to fall into. The
whole of what the reading is taken against is \`${CONDUCT_RELATIVE_PATH}\`, read
at run time, so editing that domain changes what is refused with no code change and no deploy.

THE READING SAYS WHY, AND THE WHY REACHES THE AGENT. A refused turn is told what about its
ending will annoy him, in the reading's own words, rather than a canned line chosen from a
handle. Where the reading refuses without saying why, the caller falls back to its own text.

THE TIER IS THE FAST ONE, AND THAT IS NOT SETTLED. The measurement that picked a slower tier was
taken against the question set this replaced, so it says nothing about this prompt. The slower
tiers stand at their usage limit, and what this one gets wrong is read off live behaviour rather
than off a replay.

NOTHING IS CACHED. A turn end is read once, at the stop, and a cache keyed on the turn's own
text could only ever hit on a turn already let through.

THE ANSWER IS THE EXIT CODE, so no caller has to parse anything to learn what was decided:
  0  the ending will not annoy him, or nothing could be settled — let the turn end
  3  the ending will annoy him — the caller may refuse
Anything else is this command failing rather than answering, and a caller must read it as no
answer.

Usage:
  bun tools/turn-end-reading.ts --transcript <path> [flags]

  Default stdout, two lines:
    READING: <verdict>
    WHY: <what the reading said, or empty>

  --transcript <path>  The session transcript to read the ended turn from. Required. Only the
                       tail is read: the turn that just ended is the last of it.
  --pending            Something armed during the turn is still pending. Passed as the
                       mechanical fact rather than settling the turn: a seat can announce its
                       own next act while a task that will never wake it is running.
  --model <tier>       Which tier reads. Default \`${DEFAULT_READING_MODEL}\`.
  --timeout-ms <n>     Abort the call after this long. Default ${DEFAULT_TIMEOUT_MS}. A caller's own
                       timeout must sit OUTSIDE this one, or it fires first and the abort
                       keeping the answer bounded never runs.
  --json               The reading and the evidence it was taken on, as JSON.
  --help               This.
`

const EXIT_INPUT = 1

function valueOf(argv: readonly string[], flag: string): string | null {
  const at = argv.indexOf(flag)
  return at === -1 ? null : (argv[at + 1] ?? "")
}

function refuse(message: string): number {
  process.stderr.write(`refused: ${message}\n`)
  return EXIT_INPUT
}

async function main(argv: readonly string[]): Promise<number> {
  if (argv.includes("--help")) {
    process.stdout.write(HELP)
    return 0
  }

  const transcript = valueOf(argv, "--transcript")
  if (transcript === null || transcript === "")
    return refuse("--transcript: required — there is no turn to read without it")

  const named = valueOf(argv, "--model")
  const model = named ?? DEFAULT_READING_MODEL
  if (!LOGICAL_MODELS.includes(model as LogicalModel))
    return refuse(`--model: not a tier: "${model}". One of: ${LOGICAL_MODELS.join(", ")}`)

  const patience = valueOf(argv, "--timeout-ms")
  const timeoutMs = patience === null ? DEFAULT_TIMEOUT_MS : Number(patience)
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0)
    return refuse(`--timeout-ms: not a positive number of milliseconds: "${patience}"`)

  const reading = await readingFor({
    root: rootFor(resolveRoots(), AKASHA),
    transcript,
    model: model as LogicalModel,
    timeoutMs,
    pending: argv.includes("--pending"),
  })

  if (argv.includes("--json")) {
    process.stdout.write(
      `${JSON.stringify({
        reading: reading.label,
        why: reading.why,
        conduct: CONDUCT_RELATIVE_PATH,
        evidence: reading.evidence,
        model,
      })}\n`
    )
  } else {
    process.stdout.write(`READING: ${reading.label}\nWHY: ${reading.why}\n`)
  }
  return exitCodeFor(reading.answer)
}

process.exitCode = await main(process.argv.slice(2))
