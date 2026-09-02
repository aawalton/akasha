import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { parse as parseYaml } from "yaml"
import { entriesIn } from "../../akasha/pages-system/page/page-entries/page-entries.module.code.ts"
import { besideAt } from "../../akasha/pages-system/page/page-file-name/page-file-name.module.code.ts"
import { kebabizeKey } from "../lib/tracking/keys.ts"
import type { Kind } from "./ledger.ts"

export type Record_ = {
  kind: Kind
  day: string
  ordinal: number
  locator: string
  fields: Map<string, unknown>
}

export type ReadFault = {
  locator: string
  reason: string
}

export type Corpus = {
  root: string
  layout: string
  days: Map<string, Record_>
  sessions: Record_[]
  tasks: Record_[]
  faults: ReadFault[]
}

const MD_SUFFIX = ".daily-tracking.md"
const SESSION_SUFFIX = ".daily-tracking.sessions.jsonl"
const TASK_SUFFIX = ".daily-tracking.completed-tasks.jsonl"

function listFiles(root: string): string[] {
  if (!existsSync(root) || !statSync(root).isDirectory()) {
    throw new Error(`corpus root is not a directory: ${root}`)
  }
  return readdirSync(root).sort()
}

export function walkFiles(root: string): string[] {
  if (!existsSync(root) || !statSync(root).isDirectory()) {
    throw new Error(`corpus root is not a directory: ${root}`)
  }
  const out: string[] = []
  const stack = [root]
  while (stack.length > 0) {
    const here = stack.pop() as string
    for (const entry of readdirSync(here).sort()) {
      const full = join(here, entry)
      if (statSync(full).isDirectory()) stack.push(full)
      else out.push(full)
    }
  }
  return out.sort()
}

export function detectLayout(root: string): "markdown" | "akasha-pages" {
  const files = walkFiles(root)
  if (files.some((f) => f.endsWith(MD_SUFFIX))) return "markdown"
  if (files.some((f) => f.endsWith(".ts"))) return "akasha-pages"
  throw new Error(`corpus root holds neither ${MD_SUFFIX} files nor .ts page files: ${root}`)
}

function frontmatterOf(text: string, locator: string): unknown {
  const match = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(text)
  if (match === null) throw new Error(`${locator}: no frontmatter fence`)
  const body = match[2] ?? ""
  if (body.trim().length > 0) {
    throw new Error(`${locator}: markdown body text is present and this reader carries no body`)
  }
  const parsed = parseYaml(match[1] ?? "")
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`${locator}: frontmatter is not a mapping`)
  }
  return parsed
}

function jsonlRows(text: string, locator: string): unknown[] {
  const out: unknown[] = []
  const lines = text.split("\n")
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? ""
    if (line.trim().length === 0) {
      if (line.length > 0) throw new Error(`${locator}#${index + 1}: whitespace-only line`)
      continue
    }
    let row: unknown
    try {
      row = JSON.parse(line)
    } catch (error) {
      throw new Error(`${locator}#${index + 1}: unparseable json (${(error as Error).message})`)
    }
    if (row === null || typeof row !== "object" || Array.isArray(row)) {
      throw new Error(`${locator}#${index + 1}: row is not an object`)
    }
    out.push(row)
  }
  return out
}

export function readMarkdownCorpus(root: string): Corpus {
  const files = listFiles(root)
  const corpus: Corpus = {
    root,
    layout: "markdown",
    days: new Map(),
    sessions: [],
    tasks: [],
    faults: [],
  }
  const dayNames = files.filter((f) => f.endsWith(MD_SUFFIX))
  for (const name of dayNames) {
    const day = name.slice(0, -MD_SUFFIX.length)
    const locator = join(root, name)
    try {
      const parsed = frontmatterOf(readFileSync(locator, "utf8"), locator) as Record<string, unknown>
      corpus.days.set(day, {
        kind: "day",
        day,
        ordinal: 0,
        locator,
        fields: new Map(Object.entries(parsed)),
      })
    } catch (error) {
      corpus.faults.push({ locator, reason: (error as Error).message })
    }
  }
  const sidecars: [string, Kind, Record_[]][] = [
    [SESSION_SUFFIX, "session", corpus.sessions],
    [TASK_SUFFIX, "task", corpus.tasks],
  ]
  for (const [suffix, kind, sink] of sidecars) {
    for (const name of files.filter((f) => f.endsWith(suffix))) {
      const day = name.slice(0, -suffix.length)
      const locator = join(root, name)
      try {
        const rows = jsonlRows(readFileSync(locator, "utf8"), locator)
        rows.forEach((row, index) => {
          sink.push({
            kind,
            day,
            ordinal: index,
            locator: `${locator}#${index + 1}`,
            fields: new Map(Object.entries(row as Record<string, unknown>)),
          })
        })
      } catch (error) {
        corpus.faults.push({ locator, reason: (error as Error).message })
      }
    }
  }
  return corpus
}

const DAY_PAGE_TYPE = "daily-tracking"

const ENTRY_PROPERTIES: [string, Kind][] = [
  ["sessions", "session"],
  ["completed-tasks", "task"],
]

export async function readAkashaPageCorpus(root: string): Promise<Corpus> {
  const corpus: Corpus = {
    root,
    layout: "akasha-pages",
    days: new Map(),
    sessions: [],
    tasks: [],
    faults: [],
  }
  const here = walkFiles(root)
  const spokenFor = new Set<string>()

  for (const path of here.filter((p) => p.endsWith(".ts"))) {
    let module_: Record<string, unknown>
    try {
      module_ = (await import(path)) as Record<string, unknown>
    } catch (error) {
      corpus.faults.push({ locator: path, reason: `import failed (${(error as Error).message})` })
      continue
    }
    for (const exported of Object.values(module_)) {
      if (exported === null || typeof exported !== "object" || Array.isArray(exported)) continue
      const shape = exported as Record<string, unknown>
      if (shape["pageTypeSlug"] !== DAY_PAGE_TYPE) continue

      const fields = new Map<string, unknown>()
      for (const [key, value] of Object.entries(shape)) fields.set(kebabizeKey(key), value)
      const date = fields.get("date")
      const day = date instanceof Date ? date.toISOString().slice(0, 10) : String(date ?? "")
      if (day === "") {
        corpus.faults.push({ locator: path, reason: "the page states no date, so its day is unknowable" })
        continue
      }
      corpus.days.set(day, { kind: "day", day, ordinal: 0, locator: path, fields })

      for (const [propertySlug, kind] of ENTRY_PROPERTIES) {
        const held = fields.get(propertySlug)
        if (held === undefined) continue
        if (typeof held !== "string") {
          corpus.faults.push({
            locator: path,
            reason: `'${propertySlug}' names no extension, so where the rows are is unknowable`,
          })
          continue
        }
        const beside = besideAt(path, propertySlug, held)
        if (beside === null) {
          corpus.faults.push({ locator: path, reason: "the page path is no page file name" })
          continue
        }
        spokenFor.add(beside)
        let text: string
        try {
          text = readFileSync(beside, "utf8")
        } catch {
          corpus.faults.push({
            locator: beside,
            reason: `named by the page beside it and no file is there, so what it carries is unknown rather than nothing`,
          })
          continue
        }
        const read = entriesIn(beside, text)
        if ("refused" in read) {
          corpus.faults.push({ locator: beside, reason: read.refused })
          continue
        }
        const sink = kind === "session" ? corpus.sessions : corpus.tasks
        read.entries.forEach((row, index) => {
          sink.push({
            kind,
            day,
            ordinal: index,
            locator: `${beside}#${index + 1}`,
            fields: new Map(Object.entries(row as Record<string, unknown>)),
          })
        })
      }
    }
  }

  for (const path of here.filter((p) => p.endsWith(".jsonl"))) {
    if (spokenFor.has(path)) continue
    corpus.faults.push({
      locator: path,
      reason: "rows sit here that no page states, so nothing would ever read them",
    })
  }

  return corpus
}

export function summarise(corpus: Corpus): string {
  return `${corpus.root} [${corpus.layout}] days=${corpus.days.size} sessions=${corpus.sessions.length} tasks=${corpus.tasks.length} read-faults=${corpus.faults.length}`
}

export async function readCorpus(root: string): Promise<Corpus> {
  return detectLayout(root) === "markdown"
    ? readMarkdownCorpus(root)
    : await readAkashaPageCorpus(root)
}
