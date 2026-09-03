export const tool = {
  summary: "List every page written to a repo but not yet committed, with the writer that wrote it",
  path: "page unlanded",
} as const

import { isAddressable, resolveRoots } from "@akasha/pages-system/checkout-roots"
import {
  type Journal,
  journalDir,
  readJournals,
  rootStands,
  writerAlive,
} from "@akasha/pages-system/page-landing-journal"
import { STALL_ATTEMPTS } from "./lib/page-commit-queue.ts"

const HELP = `bun tools/unlanded.ts — every page written to disk whose commit has not landed

Answers one question: is anything written but not committed, and whose is it? It reads
the commit queue's OWN durable record, not \`git status\`. That distinction is the point.
Git shows a dirty tree and cannot tell a landing the queue gave up on from a delegate
who is still mid-batch; this shows only what a writer handed to the queue and the queue
has not yet committed, so every line here is a file somebody was told had been saved.

The record is a small journal per repo root under $PAGE_LANDING_JOURNAL_DIR
(default ~/.local/state/page-landings). A path is written into it before the write
returns success and removed only when its commit lands, so the record survives the
service being restarted, killed or crashing — which is exactly when a queued landing
used to disappear without trace.

Default stdout: one TSV line per file — \`<state>\\t<root>\\t<path>\\t<age-seconds>\\t<act>\`.
The act names the page type, the change made and the WRITER that asked for it.

THE THREE STATES, and what each asks of you:

  queued    A live process holds this landing and is still retrying it. Nothing is wrong
            unless the age keeps climbing; the queue backs off and never gives up.
  stalled   Still queued and still being retried, but it has now missed at least
            ${STALL_ATTEMPTS} attempts. Something is holding the landing lock. Read the holder
            before touching it: the lock's pid rotates between live writers and its
            timestamp does not move, so a working lock looks abandoned.
  orphaned  The process that queued it is gone. Nothing is retrying it right now. The
            pages-system-service picks these up and re-queues them the next time it starts,
            so restarting it is the fix; a file whose repo root no longer exists is
            dropped from the journal at that point instead.

A journal entry can outlive its cause: if the file was in fact committed by some other
route, the next attempt sees no diff against HEAD, treats the landing as made, and the
line goes. Nothing here needs clearing by hand. If you must, delete the journal file.

Usage:
  bun ~/repos/akasha/tools/unlanded.ts [--repo <name>] [--json]

Flags:
  --repo <name>  Only the named repo's root. The repos there are to name are the ones with a
                 page under \`akasha/infrastructure/repos/pages\`, and naming one that is
                 not cloned here is refused rather than reported empty.
                 Omitted — which is how \`ops page unlanded\` runs it — every root the
                 journal holds is reported. That is the answer an operator wants: a landing
                 is lost per PROCESS, not per repo.
  --json         Emit \`{ files: [{ state, root, path, ageSeconds, act, writerPid }] }\`.
  --help         This.

Exit codes:
  0  nothing stands written but uncommitted
  1  at least one file does
  2  the call could not be read. Nothing was listed.
`

type State = "queued" | "stalled" | "orphaned"

interface Unlanded {
  readonly state: State
  readonly root: string
  readonly path: string
  readonly ageSeconds: number
  readonly act: string
  readonly writerPid: number
}

function refuse(message: string): never {
  process.stderr.write(`error: ${message}\n`)
  process.exit(2)
}

function stateOf(one: Journal): State {
  if (!writerAlive(one.pid)) return "orphaned"
  return one.attempts >= STALL_ATTEMPTS ? "stalled" : "queued"
}

function listed(journals: readonly Journal[], root: string | null): readonly Unlanded[] {
  const now = Date.now()
  const found: Unlanded[] = []
  for (const one of journals) {
    if (root !== null && one.root !== root) continue
    const state = stateOf(one)
    for (const [path, each] of Object.entries(one.paths)) {
      found.push({
        state,
        root: one.root,
        path,
        ageSeconds: Math.max(0, Math.round((now - each.at) / 1000)),
        act: each.act,
        writerPid: one.pid,
      })
    }
  }
  return [...found].sort((a, b) => b.ageSeconds - a.ageSeconds || a.path.localeCompare(b.path))
}

function rootNamed(named: string): string {
  if (!isAddressable(named)) refuse(`\`${named}\` names no repo this reads`)
  const root = resolveRoots()[named]
  if (root === undefined) {
    refuse(`\`${named}\` has a repo page but no checkout here, so there is no root to read`)
  }
  return root
}

function main(): void {
  const argv = process.argv.slice(2)
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(HELP)
    return
  }
  let root: string | null = null
  let wantJson = false
  for (let at = 0; at < argv.length; at += 1) {
    const token = argv[at]
    if (token === "--json") {
      wantJson = true
      continue
    }
    if (token === "--repo") {
      const value = argv[at + 1]
      if (value === undefined) refuse("--repo needs a value")
      root = rootNamed(value)
      at += 1
      continue
    }
    refuse(`\`${token}\` is not an argument this takes — run it with --help`)
  }

  const journals = readJournals()
  const files = listed(journals, root)
  const gone = journals.filter((one) => !rootStands(one.root)).map((one) => one.root)

  if (wantJson) {
    process.stdout.write(`${JSON.stringify({ files }, null, 2)}\n`)
  } else if (files.length > 0) {
    const lines = files.map(
      (one) => `${one.state}\t${one.root}\t${one.path}\t${one.ageSeconds}\t${one.act}`
    )
    process.stdout.write(`${lines.join("\n")}\n`)
  }

  const counted = new Map<State, number>()
  for (const one of files) counted.set(one.state, (counted.get(one.state) ?? 0) + 1)
  const summary = (["orphaned", "stalled", "queued"] as const)
    .filter((state) => counted.has(state))
    .map((state) => `${counted.get(state) ?? 0} ${state}`)
    .join(", ")
  process.stderr.write(
    `${files.length} file(s) written but uncommitted${summary === "" ? "" : ` — ${summary}`} ` +
      `(journal: ${journalDir()})\n`
  )
  for (const one of journals) {
    if (root !== null && one.root !== root) continue
    if (one.reason !== null) process.stderr.write(`${one.root}: ${one.reason}\n`)
  }
  for (const each of gone) {
    process.stderr.write(`${each}: this root is no longer a directory, so nothing can land there\n`)
  }
  process.exitCode = files.length > 0 ? 1 : 0
}

if (import.meta.main) main()
