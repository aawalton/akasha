import { Buffer } from "node:buffer"
import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"
import { ENTRY_CEILING } from "akasha/page/modules/entry-ceiling/entry-ceiling.module.code.ts"
import { FIRST_PART } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { partAt } from "akasha/page/modules/file-parts/page-file-parts.module.code.ts"
import {
  type Put,
  readFiles,
  readPages,
  writeFiles,
} from "akasha/page/query/modules/store-writing/store-writing.module.code.ts"
import {
  jsonlBodyOf,
  landOverAttempts,
  PAGE_LANDING_WRITER,
  type ReadFiles,
  type ReadPages,
  type Tried,
  triedFrom,
  type Waiting,
  type WriteFiles,
  waitFor,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"
import { mineRowLanding } from "akasha/temper/web/modules/mine-row-landing/mine-row-landing.module.ts"
import {
  covers,
  HELD,
  keyedAt,
  MINE_PAGE_TYPE,
  minePage,
  noPartWhy,
  partsWalked,
  SPANS_PROPERTY,
  type SpanRow,
  spanIn,
  spansOf,
  spansRead,
} from "akasha/temper/web/modules/mine-row-reading/mine-row-reading.module.code.ts"
import { MINE_NAME } from "akasha/temper/web/modules/mined-item-rows/mined-item-rows.module.code.ts"
import { z } from "zod"

const ITEM_FIELDS = [
  "icon",
  "abilityCooldown",
  "abilityDescription",
  "abilityHeader",
  "armorRating",
  "armorType",
  "enchantDescription",
  "enchantHeader",
  "equipType",
  "filterType",
  "filterTypeSpecific",
  "flavorText",
  "hasOnUseAbility",
  "hasSet",
  "isUnique",
  "isUniqueEquipped",
  "itemId",
  "itemType",
  "minedAt",
  "name",
  "quality",
  "requiredCp",
  "requiredLevel",
  "setBonuses",
  "setId",
  "setMaxEquip",
  "setName",
  "specializedItemType",
  "style",
  "traitDescription",
  "traitType",
  "merchantValue",
  "weaponPower",
  "weaponType",
] as const

const QUEST_FIELDS = [
  "minedAt",
  "questId",
  "questType",
  "repeatableType",
  "zoneId",
  "zoneName",
] as const

type MineRow = Readonly<Record<string, unknown>>

type MineRows = {
  readonly property: string
  readonly key: string
  readonly rows: readonly MineRow[]
}

export type MineLanding = {
  readonly readPages: ReadPages
  readonly readFiles: ReadFiles
  readonly writeFiles: WriteFiles
  readonly waiting: Waiting
  readonly minted: () => string
}

type MineKept =
  | { readonly ok: true; readonly kept: number }
  | { readonly ok: false; readonly why: string }

const LANDING: MineLanding = {
  readPages,
  readFiles,
  writeFiles,
  waiting: waitFor,
  minted: () => Bun.randomUUIDv7(),
}

function picked(
  posted: MineRow,
  fields: readonly string[],
  minedAt: number
): Record<string, unknown> {
  const row: Record<string, unknown> = { title: posted.name }
  for (const field of fields) row[field] = field === "minedAt" ? minedAt : posted[field]
  return row
}

export function storedItemOf(posted: MineRow, minedAt: number): MineRow {
  return picked(posted, ITEM_FIELDS, minedAt)
}

export function storedQuestOf(posted: MineRow, minedAt: number): MineRow {
  return picked(posted, QUEST_FIELDS, minedAt)
}

const IDENTIFIED = z.looseObject({ id: z.string() })

function idIn(line: string): string | null {
  try {
    const row = IDENTIFIED.safeParse(JSON.parse(line))
    return row.success ? row.data.id : null
  } catch {
    return null
  }
}

type Part = { readonly part: number; readonly path: string; readonly lines: string[] }

type Found = {
  readonly at: string
  readonly read: ReadonlyMap<number, Part>
  readonly last: Part
  readonly places: ReadonlyMap<string, readonly (readonly [number, number])[]>
  readonly spans: readonly SpanRow[]
}

type Reading =
  | { readonly ok: true; readonly found: Found }
  | { readonly ok: false; readonly why: string }

type Composed = { readonly puts: readonly Put[]; readonly parts: ReadonlyMap<number, Part> }

async function partsRead(
  page: string,
  asked: MineRows,
  wanted: ReadonlySet<string>,
  landing: MineLanding
): Promise<Reading> {
  const spans = await spansRead(page, landing)
  if (!spans.ok) return spans
  const held = spansOf(spans.rows, asked.property)
  const highest = Math.max(FIRST_PART - 1, ...held.keys())
  const keys = [...wanted].map(Number)
  const keyed = keyedAt(asked.key)
  const read = new Map<number, Part>()
  const places = new Map<string, (readonly [number, number])[]>()
  const walked = await partsWalked(
    page,
    asked.property,
    held,
    (part, span) => part === highest || covers(span, keys),
    (one) => {
      read.set(one.part, { part: one.part, path: one.path, lines: [...one.lines] })
      for (const [line, text] of one.lines.entries()) {
        const key = firstCapture(keyed.exec(text))
        if (key === null || !wanted.has(key)) continue
        places.set(key, [...(places.get(key) ?? []), [one.part, line]])
      }
      return false
    },
    landing
  )
  if (!walked.ok) return walked
  const lastPart = Math.max(FIRST_PART, ...read.keys())
  const path = partAt(page, asked.property, HELD, lastPart)
  if (path === null) return { ok: false, why: noPartWhy(page, asked.property) }
  const last = read.get(lastPart) ?? { part: lastPart, path, lines: [] }
  return { ok: true, found: { at: spans.at, read, last, places, spans: spans.rows } }
}

function lineOf(id: string, row: MineRow): string {
  return JSON.stringify({ id, ...row })
}

function bytesOf(lines: readonly string[]): number {
  return Buffer.byteLength(jsonlBodyOf(lines))
}

function composedPuts(page: string, asked: MineRows, found: Found, minted: () => string): Composed {
  const byKey = new Map<string, MineRow>()
  for (const row of asked.rows) byKey.set(String(row[asked.key]), row)
  const parts = new Map<number, Part>(found.read)
  const changed = new Set<number>()
  const replaced = new Map<number, number[]>()
  const appended: string[] = []
  for (const [key, row] of byKey) {
    const held = found.places.get(key) ?? []
    if (held.length === 0) appended.push(lineOf(minted(), row))
    for (const [part, line] of held) {
      const lines = parts.get(part)?.lines ?? []
      lines[line] = lineOf(idIn(lines[line] ?? "") ?? minted(), row)
      replaced.set(part, [...(replaced.get(part) ?? []), line])
      changed.add(part)
    }
  }
  for (const [part, held] of replaced) {
    const lines = parts.get(part)?.lines ?? []
    if (bytesOf(lines) <= ENTRY_CEILING) continue
    for (const line of [...held].sort((one, two) => two - one)) {
      appended.push(...lines.splice(line, 1))
    }
  }
  let tail = parts.get(found.last.part) ?? found.last
  let size = bytesOf(tail.lines)
  for (const line of appended) {
    const more = Buffer.byteLength(line) + 1
    if (tail.lines.length > 0 && size + more > ENTRY_CEILING) {
      const next = tail.part + 1
      const path = partAt(page, asked.property, HELD, next)
      if (path === null) throw new Error(noPartWhy(page, asked.property))
      tail = { part: next, path, lines: [] }
      size = 0
    }
    tail.lines.push(line)
    size += more
    parts.set(tail.part, tail)
    changed.add(tail.part)
  }
  const puts: Put[] = []
  for (const part of changed) {
    const one = parts.get(part)
    if (one !== undefined) puts.push({ path: one.path, content: jsonlBodyOf(one.lines) })
  }
  return { puts, parts }
}

function spansPut(
  page: string,
  asked: MineRows,
  found: Found,
  parts: ReadonlyMap<number, Part>,
  minted: () => string
): Put {
  const path = partAt(page, SPANS_PROPERTY, HELD, FIRST_PART)
  if (path === null) throw new Error(noPartWhy(page, SPANS_PROPERTY))
  const keyed = keyedAt(asked.key)
  const ids = new Map<number, string>()
  const rows: SpanRow[] = []
  for (const row of found.spans) {
    const mine = row.propertySlug === asked.property
    if (mine) ids.set(row.part, row.id)
    if (!mine || !parts.has(row.part)) rows.push(row)
  }
  for (const [part, one] of parts) {
    const span = spanIn(one.lines, keyed)
    if (span === null) continue
    const id = ids.get(part) ?? minted()
    rows.push({
      id,
      propertySlug: asked.property,
      part,
      firstKey: span.first,
      lastKey: span.last,
    })
  }
  rows.sort((one, two) => one.propertySlug.localeCompare(two.propertySlug) || one.part - two.part)
  return { path, content: jsonlBodyOf(rows.map((row) => JSON.stringify(row))) }
}

export async function landMineRows(
  asked: MineRows,
  landing: MineLanding = LANDING
): Promise<MineKept> {
  const wanted = new Set(asked.rows.map((row) => String(row[asked.key])))
  if (wanted.size === 0) return { ok: true, kept: 0 }
  const page = await minePage(landing)
  if (typeof page !== "string") return { ok: false, why: page.why }
  const said = `${wanted.size} mined ${asked.property}`
  const message = `temper: ${said} kept in ${MINE_PAGE_TYPE}/${MINE_NAME}`
  const tryOnce = async (): Promise<Tried> => {
    const read = await partsRead(page, asked, wanted, landing)
    if (!read.ok) return { outcome: "again", why: read.why }
    const composed = composedPuts(page, asked, read.found, landing.minted)
    const spans = spansPut(page, asked, read.found, composed.parts, landing.minted)
    const wrote = await landing.writeFiles(
      [...composed.puts, spans],
      PAGE_LANDING_WRITER,
      message,
      undefined,
      undefined,
      read.found.at,
      mineRowLanding.slug
    )
    return triedFrom(wrote)
  }
  const landed = await landOverAttempts(`no attempt to keep ${said} was made`, tryOnce, {
    waiting: landing.waiting,
  })
  if (landed.outcome === "refused") return { ok: false, why: landed.why }
  return { ok: true, kept: wanted.size }
}
