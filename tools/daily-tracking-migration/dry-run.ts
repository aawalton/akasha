/**
 * The whole corpus converted in memory and reported on, with nothing landed unless a directory is
 * named to land it in — and never the real one.
 *
 * The verdict on whether values survived is not computed here. It is taken from
 * `tools/daily-tracking-fidelity`, which is the one checker over this corpus; this file builds the
 * migrated corpus as a value and hands it to that comparator, because the fidelity reader walks
 * `.ts` page files and the rows this converter writes are entries beside a page rather than pages.
 */

import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { uuidVersion7 } from "../../akasha/command-system/value-minting/value-minting.module.code.ts"
import { compareCorpora } from "../daily-tracking-fidelity/compare.ts"
import {
  type Corpus,
  readMarkdownCorpus,
  type Record_,
} from "../daily-tracking-fidelity/read-corpus.ts"
import { kebabizeKey } from "../lib/tracking/keys.ts"
import { type Converted, convertDay, type Outcome, refused, renderPage } from "./convert.ts"
import { readDays } from "./read-days.ts"
import { rowPagesOf } from "./row-pages.ts"
import {
  COMPLETED_TASKS_SLUG,
  DAY_PAGE_TYPE,
  PROPERTY_PAGES_NEEDED,
  SESSIONS_SLUG,
} from "./shape.ts"

const HELP = `daily-tracking-migration dry run

  bun tools/daily-tracking-migration/dry-run.ts --from <dir> [--out <dir>]

  --from   a directory of *.daily-tracking.md days and their jsonl sidecars
  --out    where to write the converted pages; refused for the live corpus
  --as     entries (the default) or pages, the unsettled seam over where a row lives
  --ordinal  with --as pages, state each session's position in its file

  Exit 0 when every day converts and every value round-trips. Exit 1 otherwise.
`

const LIVE = resolve(join(import.meta.dir, "..", "..", "pages", "daily-tracking"))

const AKASHA = resolve(join(import.meta.dir, "..", "..", "akasha"))

function argOf(name: string): string | null {
  const at = process.argv.indexOf(`--${name}`)
  if (at === -1) return null
  const said = process.argv[at + 1]
  if (said === undefined || said.startsWith("--")) {
    process.stderr.write(`--${name} needs a value\n`)
    process.exit(2)
  }
  return said
}

/**
 * The day page's value as the fidelity ledger reads it.
 *
 * The two entry declarations are left out. `sessions: "jsonl"` is the page saying which file its
 * rows are in rather than a value the day carries, and the ledger judges day values.
 */
function dayFields(one: Converted): Map<string, unknown> {
  const fields = new Map<string, unknown>()
  for (const [key, held] of Object.entries(one.value)) {
    const said = kebabizeKey(key)
    if (said === SESSIONS_SLUG || said === COMPLETED_TASKS_SLUG) continue
    fields.set(said, held)
  }
  return fields
}

/** The day's page value with the two entry declarations taken off, camel keys kept. */
function withoutEntryDeclarations(one: Converted): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [key, held] of Object.entries(one.value)) {
    const said = kebabizeKey(key)
    if (said === SESSIONS_SLUG || said === COMPLETED_TASKS_SLUG) continue
    out[key] = held
  }
  return out
}

function migratedCorpus(root: string, done: readonly Converted[]): Corpus {
  const corpus: Corpus = {
    root,
    layout: "akasha-pages",
    days: new Map(),
    sessions: [],
    tasks: [],
    faults: [],
  }
  for (const one of done) {
    corpus.days.set(one.day, {
      kind: "day",
      day: one.day,
      ordinal: 0,
      locator: one.pageName,
      fields: dayFields(one),
    })
    for (const file of one.entries) {
      const sink: Record_[] = file.name.includes(`.${SESSIONS_SLUG}.`) ? corpus.sessions : corpus.tasks
      const kind = sink === corpus.sessions ? "session" : "task"
      const lines = file.text.split("\n").filter((l) => l.trim() !== "")
      lines.forEach((line, index) => {
        sink.push({
          kind,
          day: one.day,
          ordinal: index,
          locator: `${file.name}#${index + 1}`,
          fields: new Map(Object.entries(JSON.parse(line) as Record<string, unknown>)),
        })
      })
    }
  }
  return corpus
}

function landing(out: string, done: readonly Converted[]): void {
  const at = resolve(out)
  if (at === LIVE || at.startsWith(`${LIVE}/`)) {
    process.stderr.write(
      `--out names the live corpus at ${LIVE}. This dry run does not land a migrated day.\n`
    )
    process.exit(2)
  }
  if (at === AKASHA || at.startsWith(`${AKASHA}/`)) {
    process.stderr.write("--out names the akasha folder, which only akasha's own verbs write.\n")
    process.exit(2)
  }
  mkdirSync(at, { recursive: true })
  const asPages = argOf("as") === "pages"
  const ordinal = process.argv.includes("--ordinal")
  for (const one of done) {
    if (asPages) {
      // A day whose rows are pages of their own names no file beside it, so the two entry
      // declarations come off before the page is rendered.
      writeFileSync(
        join(at, one.pageName),
        renderPage(one.exportName, withoutEntryDeclarations(one))
      )
      for (const page of rowPagesOf(one, ordinal)) writeFileSync(join(at, page.name), page.text)
      continue
    }
    writeFileSync(join(at, one.pageName), one.pageText)
    for (const file of one.entries) writeFileSync(join(at, file.name), file.text)
  }
}

function propertyGap(): { held: string[]; needed: string[] } {
  const held: string[] = []
  const needed: string[] = []
  for (const slug of PROPERTY_PAGES_NEEDED) {
    const glob = new Bun.Glob(`**/${slug}.*-property.ts`)
    const found = [...glob.scanSync({ cwd: AKASHA, onlyFiles: true })]
    ;(found.length > 0 ? held : needed).push(slug)
  }
  return { held, needed }
}

function main(): never {
  if (process.argv.includes("--help")) {
    process.stdout.write(HELP)
    process.exit(0)
  }
  const from = argOf("from")
  if (from === null) {
    process.stderr.write(HELP)
    process.exit(2)
  }
  if (resolve(from) === LIVE) {
    process.stderr.write(
      `--from names the live corpus. Copy it out of the repo and read the copy: ${LIVE}\n`
    )
    process.exit(2)
  }
  if (!existsSync(from)) {
    process.stderr.write(`'${from}' is not there\n`)
    process.exit(2)
  }

  const read = readDays(from)
  const idMap: Record<string, string> = {}
  const done: Converted[] = []
  const stuck: Outcome[] = []
  for (const source of read.days) {
    const outcome = convertDay(source, () => uuidVersion7())
    if (refused(outcome)) {
      stuck.push(outcome)
      continue
    }
    if (outcome.reminted) idMap[outcome.idWas] = outcome.idIs
    done.push(outcome)
  }

  const sessions = done.reduce(
    (n, one) => n + (one.entries.find((f) => f.name.includes(`.${SESSIONS_SLUG}.`))?.rows ?? 0),
    0
  )
  const tasks = done.reduce(
    (n, one) =>
      n + (one.entries.find((f) => f.name.includes(`.${COMPLETED_TASKS_SLUG}.`))?.rows ?? 0),
    0
  )
  const repointed = done.reduce((n, one) => n + one.entries.reduce((m, f) => m + f.repointed, 0), 0)

  process.stdout.write(`from            ${read.root}\n`)
  process.stdout.write(`read faults     ${read.faults.length}\n`)
  for (const fault of read.faults) process.stdout.write(`  ${fault.at} :: ${fault.why}\n`)
  process.stdout.write(`days read       ${read.days.length}\n`)
  process.stdout.write(`days converted  ${done.length}\n`)
  process.stdout.write(`days refused    ${stuck.length}\n`)
  process.stdout.write(`identities kept ${done.length - Object.keys(idMap).length}\n`)
  process.stdout.write(`identities new  ${Object.keys(idMap).length}\n`)
  process.stdout.write(`session rows    ${sessions}\n`)
  process.stdout.write(`task rows       ${tasks}\n`)
  process.stdout.write(`rows repointed  ${repointed}\n`)

  const unhandled = new Map<string, string[]>()
  for (const one of stuck) {
    if (!refused(one)) continue
    process.stdout.write(`\n  REFUSED ${one.day}\n`)
    for (const why of one.refused) process.stdout.write(`    ${why}\n`)
    for (const key of one.unhandledKeys) {
      const bucket = unhandled.get(key) ?? []
      bucket.push(one.day)
      unhandled.set(key, bucket)
    }
  }
  process.stdout.write(`\nunhandled keys  ${unhandled.size}\n`)
  for (const [key, days] of [...unhandled].sort()) {
    process.stdout.write(`  ${key.padEnd(34)} on ${days.length} day(s): ${days.join(" ")}\n`)
  }

  const gap = propertyGap()
  process.stdout.write(
    `\nproperty pages  ${gap.held.length} of ${PROPERTY_PAGES_NEEDED.length} stand under akasha/\n`
  )
  process.stdout.write(`  standing      ${gap.held.join(" ") || "-"}\n`)
  process.stdout.write(`  absent (${gap.needed.length})\n`)
  for (const slug of gap.needed) process.stdout.write(`    ${slug}\n`)
  const typeFound = [...new Bun.Glob(`**/${DAY_PAGE_TYPE}.page-type.ts`).scanSync({ cwd: AKASHA })]
  process.stdout.write(
    `  page type     ${DAY_PAGE_TYPE}.page-type.ts ${typeFound.length > 0 ? "stands" : "is absent"}\n`
  )

  const verdict = compareCorpora(readMarkdownCorpus(from), migratedCorpus(from, done), idMap)
  process.stdout.write(
    `\nfidelity        ${verdict.recordsChecked} records, ${verdict.valuesChecked} values, ${verdict.faults.length} fault(s)\n`
  )
  const byKind = new Map<string, typeof verdict.faults>()
  for (const fault of verdict.faults) {
    const bucket = byKind.get(fault.kind) ?? []
    bucket.push(fault)
    byKind.set(fault.kind, bucket)
  }
  for (const [kind, bucket] of [...byKind].sort((a, b) => b[1].length - a[1].length)) {
    process.stdout.write(`  ${kind} (${bucket.length})\n`)
    for (const fault of bucket.slice(0, 8)) {
      process.stdout.write(`    ${fault.where} :: ${fault.key} :: ${fault.detail}\n`)
    }
    if (bucket.length > 8) process.stdout.write(`    ... and ${bucket.length - 8} more\n`)
  }

  const out = argOf("out")
  if (out !== null) {
    landing(out, done)
    process.stdout.write(`\nwrote           ${done.length} pages to ${resolve(out)}\n`)
    writeFileSync(join(resolve(out), "id-map.json"), `${JSON.stringify(idMap, null, 2)}\n`)
  }

  const clean = stuck.length === 0 && verdict.faults.length === 0 && read.faults.length === 0
  process.stdout.write(clean ? "\nVERDICT clean\n" : "\nVERDICT not clean\n")
  process.exit(clean ? 0 : 1)
}

main()
