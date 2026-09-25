import { FIRST_PART } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { partAt } from "akasha/page/modules/file-parts/page-file-parts.module.code.ts"
import {
  readFiles,
  readPages,
} from "akasha/page/query/modules/store-writing/store-writing.module.code.ts"
import {
  contentIn,
  jsonlLinesOf,
  type ReadFiles,
  type ReadPages,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"
import { MINE_PAGE_TYPE } from "akasha/temper/web/modules/mine-row-landing/mine-row-landing.module.code.ts"
import { MINE_NAME } from "akasha/temper/web/modules/mined-item-rows/mined-item-rows.module.code.ts"

export const HELD = "jsonl"

export const SPANS_PROPERTY = "part-spans"

const PAGE_ENDING = ".ts"

export type MineRow = Readonly<Record<string, unknown>>

export type MineReading = {
  readonly readPages: ReadPages
  readonly readFiles: ReadFiles
}

export type MineRead =
  | { readonly ok: true; readonly rows: readonly MineRow[] }
  | { readonly ok: false; readonly why: string }

export type Span = { readonly first: number; readonly last: number }

export type SpanRow = {
  readonly id: string
  readonly propertySlug: string
  readonly part: number
  readonly firstKey: number
  readonly lastKey: number
}

export type SpansRead =
  | { readonly ok: true; readonly at: string; readonly rows: readonly SpanRow[] }
  | { readonly ok: false; readonly why: string }

export type PartRead = {
  readonly part: number
  readonly path: string
  readonly lines: readonly string[]
}

export type Walked = { readonly ok: true } | { readonly ok: false; readonly why: string }

const READING: MineReading = { readPages, readFiles }

export function keyedAt(key: string): RegExp {
  return new RegExp(`[{,]"${key}":(-?\\d+)[,}]`)
}

export function noPartWhy(page: string, property: string): string {
  return `\`${page}\` is no page a \`${property}\` part sits beside`
}

function rowIn(line: string): MineRow | null {
  try {
    const row: unknown = JSON.parse(line)
    return typeof row === "object" && row !== null && !Array.isArray(row) ? (row as MineRow) : null
  } catch {
    return null
  }
}

export async function minePage(reading: MineReading): Promise<string | { readonly why: string }> {
  const named = `${MINE_PAGE_TYPE}/${MINE_NAME}`
  const found = await reading.readPages([{ pageTypeSlug: MINE_PAGE_TYPE, slug: MINE_NAME }])
  if (!found.ok) return { why: `\`${named}\` did not come back: ${found.why}` }
  const page = found.bodies.find((one) => one.path.endsWith(PAGE_ENDING))?.path
  return page ?? { why: `no page is at \`${named}\`` }
}

export async function spansRead(page: string, reading: MineReading): Promise<SpansRead> {
  const path = partAt(page, SPANS_PROPERTY, HELD, FIRST_PART)
  if (path === null) return { ok: false, why: noPartWhy(page, SPANS_PROPERTY) }
  const read = await reading.readFiles([path])
  if (!read.ok) return { ok: false, why: `\`${path}\` did not come back: ${read.why}` }
  const lines = jsonlLinesOf(contentIn(read.bodies, path))
  return { ok: true, at: read.at, rows: lines.map((line) => JSON.parse(line) as SpanRow) }
}

export function spansOf(rows: readonly SpanRow[], property: string): ReadonlyMap<number, Span> {
  const spans = new Map<number, Span>()
  for (const row of rows) {
    if (row.propertySlug === property)
      spans.set(row.part, { first: row.firstKey, last: row.lastKey })
  }
  return spans
}

export function covers(span: Span, keys: readonly number[]): boolean {
  return keys.some((key) => key >= span.first && key <= span.last)
}

export function spanIn(lines: readonly string[], keyed: RegExp): Span | null {
  let first = Number.POSITIVE_INFINITY
  let last = Number.NEGATIVE_INFINITY
  for (const line of lines) {
    const held = keyed.exec(line)?.[1]
    if (held === undefined) continue
    const key = Number(held)
    first = Math.min(first, key)
    last = Math.max(last, key)
  }
  return first > last ? null : { first, last }
}

export async function partsWalked(
  page: string,
  property: string,
  spans: ReadonlyMap<number, Span>,
  taken: (part: number, span: Span) => boolean,
  each: (read: PartRead) => boolean,
  reading: MineReading
): Promise<Walked> {
  const highest = Math.max(FIRST_PART - 1, ...spans.keys())
  for (let part = FIRST_PART; ; part += 1) {
    const span = spans.get(part)
    if (span !== undefined && !taken(part, span)) continue
    const path = partAt(page, property, HELD, part)
    if (path === null) return { ok: false, why: noPartWhy(page, property) }
    const read = await reading.readFiles([path])
    if (!read.ok) return { ok: false, why: `\`${path}\` did not come back: ${read.why}` }
    const content = contentIn(read.bodies, path)
    if (content === null) {
      if (part > highest) return { ok: true }
      continue
    }
    if (each({ part, path, lines: jsonlLinesOf(content) })) return { ok: true }
  }
}

export async function mineRowsKeyed(
  property: string,
  key: string,
  keys: readonly number[],
  reading: MineReading = READING
): Promise<MineRead> {
  const wanted = new Set(keys.map(String))
  if (wanted.size === 0) return { ok: true, rows: [] }
  const page = await minePage(reading)
  if (typeof page !== "string") return { ok: false, why: page.why }
  const spans = await spansRead(page, reading)
  if (!spans.ok) return spans
  const keyed = keyedAt(key)
  const rows: MineRow[] = []
  const walked = await partsWalked(
    page,
    property,
    spansOf(spans.rows, property),
    (_part, span) => covers(span, keys),
    (read) => {
      for (const line of read.lines) {
        const held = keyed.exec(line)?.[1]
        if (held === undefined || !wanted.has(held)) continue
        const row = rowIn(line)
        if (typeof row?.[key] === "number" && wanted.has(String(row[key]))) rows.push(row)
      }
      return rows.length >= wanted.size
    },
    reading
  )
  return walked.ok ? { ok: true, rows } : walked
}

export async function mineRowsNamed(
  property: string,
  text: string,
  limit: number,
  reading: MineReading = READING
): Promise<MineRead> {
  const sought = text.toLowerCase()
  if (sought === "" || limit <= 0) return { ok: true, rows: [] }
  const page = await minePage(reading)
  if (typeof page !== "string") return { ok: false, why: page.why }
  const rows: MineRow[] = []
  const walked = await partsWalked(
    page,
    property,
    new Map(),
    () => true,
    (read) => {
      for (const line of read.lines) {
        if (!line.toLowerCase().includes(sought)) continue
        const row = rowIn(line)
        const name = row?.name
        if (row === null || typeof name !== "string") continue
        if (!name.toLowerCase().includes(sought)) continue
        rows.push(row)
        if (rows.length >= limit) return true
      }
      return false
    },
    reading
  )
  return walked.ok ? { ok: true, rows } : walked
}
