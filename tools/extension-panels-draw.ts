#!/usr/bin/env bun

import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import { Glob } from "bun"

const HELP = `bun tools/extension-panels-draw.ts — refuse a panel that draws nothing

\`extension-node-clean\` proves \`activate()\` returns without throwing. That is not the same as
the editor showing anything. \`startIsolated\` catches what each feature throws and activation
returns anyway, so an extension that draws four empty panels activates exactly as cleanly as one
that draws a full tree. The failure that looks like a success is the one worth an instrument.

WHAT THIS RUNS IS THE EXTENSION, NOT A MODEL OF IT.

\`editor-extension/src/extension.ts\` is bundled for node and its \`activate()\` is called under
node, the way the extension host calls it, against \`tools/extension-panel-stub.cjs\` — a \`vscode\`
whose \`createTreeView\`, \`createStatusBarItem\`, \`TreeItem\` and \`EventEmitter\` keep what is
written into them and whose every other member falls through to the same permissive Proxy
\`extension-node-clean\` uses. Then each registered provider is asked \`getChildren\` and
\`getTreeItem\` down its whole tree, so what is judged is the row the editor would draw: its
label, its id, its description, the resource uri its colour rides on.

FIVE SURFACES, AND A COUNT IS PINNED ON ONE OF THEM.

  opsAgentTree    every row carries a label and an id, and some row carries a turn colour
  opsDomainTree   every row carries a label and an id, and some row opens a document
  opsWorkTree     every row carries a label and an id, and some row carries a turn colour
  opsPageTree     every row carries a label and an id, and some row opens a document
  the status bar  two usage numbers read as numbers, and three stoplight groups count 6, 3, 6

Only the status bar's three counts are pinned, by invariants on
\`akasha/alan/harness/alan-harness.domain.ts\`. The four trees are judged on shape and on being
non-empty, never on a row count: a lane once read 13 work rows across 5 roots and those figures
were true for an hour. What is asserted is that rows exist and carry what the tree provider
reads, because a row with no label is a blank line in the panel and draws as a failure.

A PANEL MAY BE GENUINELY EMPTY, AND THAT IS THE ANSWER TO REPORT.

Where a surface is red this names it and prints what the feature said on activation, since
\`startIsolated\` writes each feature's outcome to the \`Ops: Activation\` channel and this keeps
that channel.

  --json      print the whole reading rather than the judgement
  --raw <at>  also write the reading to a file
  --help      This.
`

const ROOT = process.cwd()

const ENTRY = "editor-extension/src/extension.ts"

const STUB = "tools/extension-panel-stub.mjs"

// Every `vscodeN.member` the bundle reaches. A namespace import answers `undefined` for what the
// stub does not export, and one such member emptied all five surfaces at once the first time this
// ran, so the members are read off the bundle and checked against the stub before anything is
// judged. An instrument that cannot see its subject reports clean.
// The quote in the lookbehind is not decoration: three tree providers spell the command
// `'vscode.open'`, and read as code that reads as a reach for a member named `open`.
const REACHED = /(?<!['"`])\bvscode\d*\.([A-Za-z_][A-Za-z0-9_]*)/g

const EXPORTED = /^export (?:const|class|function) ([A-Za-z_][A-Za-z0-9_]*)|^export \{([^}]*)\}/gm

export function membersReached(bundle: string): readonly string[] {
  return [...new Set([...bundle.matchAll(REACHED)].map((one) => one[1] as string))].sort()
}

export function membersExported(stub: string): ReadonlySet<string> {
  const held = new Set<string>()
  for (const hit of stub.matchAll(EXPORTED)) {
    if (hit[1] !== undefined) held.add(hit[1])
    for (const one of (hit[2] ?? "").split(",")) {
      const named = one.trim()
      if (named !== "") held.add(named)
    }
  }
  return held
}

const RUN_TIMEOUT_MS = 180_000

// The status bar's three groups, and the count each is pinned to by an invariant on
// `akasha/alan/harness/alan-harness.domain.ts`. A group that draws four of six stoplights has
// lost two readouts, and drawing four is not an error anywhere else.
const PINNED_GROUPS: readonly { readonly id: string; readonly said: string; readonly count: number }[] = [
  { id: "opsStatusBar.upkeepStoplights", said: "upkeep", count: 6 },
  { id: "opsStatusBar.inboxStoplights", said: "inboxes", count: 3 },
  { id: "opsStatusBar.stoplights", said: "values", count: 6 },
]

const USAGE_SLOTS: readonly { readonly id: string; readonly said: string }[] = [
  { id: "opsStatusBar.usage.session", said: "session usage" },
  { id: "opsStatusBar.usage.weekly", said: "weekly usage" },
]

const A_NUMBER = /^\d+%$/

// A variation selector rides on a glyph without being one, so it is dropped before the count.
const NOT_A_GLYPH = /[︎️‍]/g

export interface DrawnRow {
  readonly label: string | null
  readonly id: string | null
  readonly description: string | null
  readonly tooltip: string | null
  readonly resourceUri: string | null
  readonly contextValue: string | null
  readonly hasCommand: boolean
  readonly drewNothing: string | null
  readonly children: readonly DrawnRow[]
}

export interface DrawnPanel {
  readonly registered: boolean
  readonly failure: string | null
  readonly roots: readonly DrawnRow[]
}

export interface DrawnItem {
  readonly id: string
  readonly priority: number | null
  readonly text: string | null
  readonly tooltip: string | null
  readonly shown: boolean
}

export interface Drawn {
  readonly activateError: string | null
  readonly panels: Readonly<Record<string, DrawnPanel>>
  readonly statusBar: readonly DrawnItem[]
  readonly channels: Readonly<Record<string, readonly string[]>>
  readonly commands: readonly string[]
}

export interface Verdict {
  readonly surface: string
  readonly green: boolean
  readonly said: string
  readonly notes: readonly string[]
}

export function everyRow(rows: readonly DrawnRow[]): readonly DrawnRow[] {
  return rows.flatMap((row) => [row, ...everyRow(row.children)])
}

export function glyphCount(text: string): number {
  return [...text.replace(NOT_A_GLYPH, "")].length
}

function blankLabels(rows: readonly DrawnRow[]): readonly DrawnRow[] {
  return rows.filter((row) => row.label === null || row.label.trim() === "")
}

function idless(rows: readonly DrawnRow[]): readonly DrawnRow[] {
  return rows.filter((row) => row.id === null || row.id === "")
}

function threw(rows: readonly DrawnRow[]): readonly DrawnRow[] {
  return rows.filter((row) => row.drewNothing !== null)
}

export interface TreeExpectation {
  readonly viewId: string
  readonly said: string
  // What at least one row must carry beyond a label. A tree whose rows all carry a label and none
  // of which opens anything or takes a colour has lost half of what the panel is for, and that
  // half fails silently, so one row carrying it is asked for.
  readonly carries: "a turn colour" | "a document to open"
}

const TREES: readonly TreeExpectation[] = [
  { viewId: "opsAgentTree", said: "Agents", carries: "a turn colour" },
  { viewId: "opsDomainTree", said: "Domains", carries: "a document to open" },
  { viewId: "opsWorkTree", said: "Work", carries: "a turn colour" },
  { viewId: "opsPageTree", said: "Pages", carries: "a document to open" },
]

function carried(rows: readonly DrawnRow[], carries: TreeExpectation["carries"]): number {
  if (carries === "a turn colour") {
    return rows.filter((row) => row.resourceUri !== null && row.resourceUri !== "").length
  }
  return rows.filter((row) => row.hasCommand).length
}

export function judgeTree(drawn: Drawn, want: TreeExpectation): Verdict {
  const panel = drawn.panels[want.viewId]
  if (panel === undefined) {
    return {
      surface: want.viewId,
      green: false,
      said: `${want.said} registered no view at all, so the panel the editor shows is not this extension's`,
      notes: [],
    }
  }
  if (panel.failure !== null) {
    return {
      surface: want.viewId,
      green: false,
      said: `${want.said} could not be read: ${firstLine(panel.failure)}`,
      notes: [],
    }
  }
  const all = everyRow(panel.roots)
  if (all.length === 0) {
    return {
      surface: want.viewId,
      green: false,
      said: `${want.said} drew no row at all — the panel is empty`,
      notes: [],
    }
  }
  const blank = blankLabels(all)
  const noId = idless(all)
  const broke = threw(all)
  const holds = carried(all, want.carries)
  const notes = [
    `${String(panel.roots.length)} roots, ${String(all.length)} rows, ${String(holds)} carrying ${want.carries}`,
  ]
  if (broke.length > 0) {
    return {
      surface: want.viewId,
      green: false,
      said: `${want.said} threw drawing ${String(broke.length)} of ${String(all.length)} rows: ${firstLine(broke[0]?.drewNothing ?? "")}`,
      notes,
    }
  }
  if (blank.length > 0) {
    return {
      surface: want.viewId,
      green: false,
      said: `${want.said} drew ${String(blank.length)} of ${String(all.length)} rows with no label, and a row with none is a blank line`,
      notes,
    }
  }
  if (noId.length > 0) {
    return {
      surface: want.viewId,
      green: false,
      said: `${want.said} drew ${String(noId.length)} of ${String(all.length)} rows with no id, and the editor collapses rows that share one`,
      notes,
    }
  }
  if (holds === 0) {
    return {
      surface: want.viewId,
      green: false,
      said: `${want.said} drew ${String(all.length)} rows and not one carries ${want.carries}`,
      notes,
    }
  }
  return { surface: want.viewId, green: true, said: `${want.said} drew ${String(all.length)} rows`, notes }
}

export function judgeStatusBar(drawn: Drawn): Verdict {
  const items = drawn.statusBar
  if (items.length === 0) {
    return { surface: "statusBar", green: false, said: "the status bar created no item at all", notes: [] }
  }
  const byId = new Map(items.map((one) => [one.id, one]))
  const notes: string[] = [
    `${String(items.length)} items: ${items.map((one) => `${one.id}=${one.text ?? "null"}`).join(" ")}`,
  ]
  const wrong: string[] = []
  for (const slot of USAGE_SLOTS) {
    const item = byId.get(slot.id)
    if (item === undefined) {
      wrong.push(`no ${slot.said} slot was created`)
      continue
    }
    if (item.text === null || !A_NUMBER.test(item.text)) {
      wrong.push(`${slot.said} reads \`${item.text ?? "null"}\` rather than a number`)
    }
  }
  for (const group of PINNED_GROUPS) {
    const item = byId.get(group.id)
    if (item === undefined) {
      wrong.push(`no ${group.said} group was created`)
      continue
    }
    const shown = glyphCount(item.text ?? "")
    if (shown !== group.count) {
      wrong.push(
        `the ${group.said} group shows ${String(shown)} stoplights and the invariant pins ${String(group.count)}` +
          ` (it reads \`${item.text ?? "null"}\`)`
      )
    }
  }
  const hidden = items.filter((one) => !one.shown)
  if (hidden.length > 0) {
    wrong.push(`${String(hidden.length)} items were created and never shown`)
  }
  if (wrong.length > 0) {
    return { surface: "statusBar", green: false, said: `the status bar — ${wrong.join("; ")}`, notes }
  }
  return {
    surface: "statusBar",
    green: true,
    said: `the status bar drew ${String(items.length)} slots, both usage numbers and 6/3/6 stoplights`,
    notes,
  }
}

function firstLine(said: string): string {
  const one = said.split("\n").find((line) => line.trim() !== "")
  return one === undefined ? said : one.trim()
}

async function draw(rawAt: string | null): Promise<Drawn> {
  const out = mkdtempSync(join(tmpdir(), "ext-panels-"))
  try {
    const built = await Bun.build({
      entrypoints: [join(ROOT, ENTRY)],
      target: "node",
      external: ["vscode"],
      outdir: join(out, "built"),
    })
    if (!built.success) {
      throw new Error(`the bundle failed: ${built.logs.map((one) => String(one)).join("; ")}`)
    }
    const files = [...new Glob("**/*.js").scanSync(join(out, "built"))]
    const first = files[0]
    if (first === undefined) throw new Error("the bundle wrote no file, so nothing was drawn")

    const bundle = readFileSync(join(out, "built", first), "utf8")
    const stub = readFileSync(join(ROOT, STUB), "utf8")
    const exported = membersExported(stub)
    const unnamed = membersReached(bundle).filter((one) => !exported.has(one))
    if (unnamed.length > 0) {
      throw new Error(
        `the extension reaches vscode.${unnamed.join(", vscode.")}, which ${STUB} does not export.` +
          ` A namespace import answers undefined for those, and undefined would empty a panel` +
          ` rather than say why. Add them to the stub.`
      )
    }

    mkdirSync(join(out, "node_modules", "vscode"), { recursive: true })
    writeFileSync(join(out, "package.json"), `{ "type": "module" }\n`)
    writeFileSync(
      join(out, "node_modules", "vscode", "package.json"),
      `{ "name": "vscode", "version": "0.0.0", "type": "module", "main": "index.mjs" }\n`
    )
    cpSync(join(ROOT, STUB), join(out, "node_modules", "vscode", "index.mjs"))
    writeFileSync(join(out, "bundle.js"), bundle)
    // The reading goes to a file and never down a pipe, so the exit that follows it cannot cut it
    // short. The exit is here because activation leaves poll timers standing and node would
    // otherwise never come back.
    writeFileSync(
      join(out, "probe.mjs"),
      `import { createRequire } from "node:module"
import { writeFileSync } from "node:fs"
const require = createRequire(import.meta.url)
const vscode = require("vscode")
const at = process.argv[2]
let activateError = null
let report = { panels: {}, statusBar: [], channels: {}, commands: [] }
try {
  const ext = await import("./bundle.js")
  await ext.activate(vscode.__makeContext())
} catch (err) {
  activateError = String((err && err.stack) || err)
}
try {
  report = await vscode.__report()
} catch (err) {
  activateError = (activateError === null ? "" : activateError + "\\n") + "the reading failed: " + String((err && err.stack) || err)
}
writeFileSync(at, JSON.stringify({ activateError, ...report }))
process.exit(0)
`
    )
    const at = join(out, "drawn.json")
    const ran = Bun.spawnSync(["node", join(out, "probe.mjs"), at], {
      cwd: out,
      env: process.env,
      timeout: RUN_TIMEOUT_MS,
    })
    let read: string
    try {
      read = readFileSync(at, "utf8")
    } catch {
      const said = `${ran.stderr.toString()}${ran.stdout.toString()}`.trim()
      throw new Error(
        `node wrote no reading and exited ${String(ran.exitCode)}: ${said === "" ? "it said nothing" : said}`
      )
    }
    if (rawAt !== null) {
      mkdirSync(dirname(rawAt), { recursive: true })
      writeFileSync(rawAt, read)
    }
    return JSON.parse(read) as Drawn
  } finally {
    rmSync(out, { recursive: true, force: true })
  }
}

function activationLines(drawn: Drawn): readonly string[] {
  return drawn.channels["Ops: Activation"] ?? []
}

export async function main(argv: readonly string[]): Promise<number> {
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(HELP)
    return 0
  }
  let asJson = false
  let rawAt: string | null = null
  for (let at = 0; at < argv.length; at += 1) {
    if (argv[at] === "--json") {
      asJson = true
      continue
    }
    if (argv[at] === "--raw") {
      const named = argv[at + 1]
      if (named === undefined) {
        process.stderr.write("error: --raw takes a path after it\n")
        return 1
      }
      rawAt = named
      at += 1
      continue
    }
    process.stderr.write(`error: this command takes no flag ${String(argv[at])}\n`)
    return 1
  }

  let drawn: Drawn
  try {
    drawn = await draw(rawAt)
  } catch (err) {
    process.stderr.write(`UNJUDGED — ${err instanceof Error ? err.message : String(err)}\n`)
    return 4
  }

  if (asJson) {
    process.stdout.write(`${JSON.stringify(drawn, null, 2)}\n`)
    return 0
  }

  const verdicts = [...TREES.map((one) => judgeTree(drawn, one)), judgeStatusBar(drawn)]
  const red = verdicts.filter((one) => !one.green)

  if (drawn.activateError !== null) {
    process.stdout.write(`REFUSED  activation threw: ${firstLine(drawn.activateError)}\n`)
  }
  for (const verdict of verdicts) {
    process.stdout.write(`${verdict.green ? "drawn   " : "EMPTY   "} ${verdict.surface} — ${verdict.said}\n`)
    for (const note of verdict.notes) process.stdout.write(`         ${note}\n`)
  }
  if (red.length > 0) {
    for (const line of activationLines(drawn)) {
      process.stdout.write(`  activation said: ${line}\n`)
    }
  }
  process.stdout.write(
    `${String(verdicts.length - red.length)} of ${String(verdicts.length)} surfaces draw content` +
      (red.length === 0 ? "\n" : `; ${red.map((one) => one.surface).join(", ")} do not\n`)
  )
  return red.length > 0 || drawn.activateError !== null ? 2 : 0
}

if (import.meta.main) process.exitCode = await main(process.argv.slice(2))
