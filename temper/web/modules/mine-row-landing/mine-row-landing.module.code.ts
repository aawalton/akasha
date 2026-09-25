import { Buffer } from "node:buffer"
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
  contentIn,
  jsonlBodyOf,
  jsonlLinesOf,
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
import { MINE_NAME } from "akasha/temper/web/modules/mined-item-rows/mined-item-rows.module.code.ts"

export const MINE_PAGE_TYPE = "temper-mine"

const HELD = "jsonl"

const PAGE_ENDING = ".ts"

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

export type MineRow = Readonly<Record<string, unknown>>

export type MineRows = {
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

export type MineKept =
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

function keyedAt(key: string): RegExp {
  return new RegExp(`[{,]"${key}":(-?\\d+)[,}]`)
}

function idIn(line: string): string | null {
  try {
    const row: unknown = JSON.parse(line)
    if (typeof row !== "object" || row === null) return null
    const id = (row as { id?: unknown }).id
    return typeof id === "string" ? id : null
  } catch {
    return null
  }
}

type Part = { readonly part: number; readonly path: string; readonly lines: string[] }

type Found = {
  readonly at: string
  readonly touched: ReadonlyMap<number, Part>
  readonly last: Part
  readonly places: ReadonlyMap<string, readonly (readonly [number, number])[]>
}

type Reading =
  | { readonly ok: true; readonly found: Found }
  | { readonly ok: false; readonly why: string }

function noPartWhy(page: string, property: string): string {
  return `\`${page}\` is no page a \`${property}\` part sits beside`
}

async function partsRead(
  page: string,
  asked: MineRows,
  wanted: ReadonlySet<string>,
  landing: MineLanding
): Promise<Reading> {
  const keyed = keyedAt(asked.key)
  const touched = new Map<number, Part>()
  const places = new Map<string, (readonly [number, number])[]>()
  let at: string | null = null
  let last: Part | null = null
  for (let part = FIRST_PART; ; part += 1) {
    const path = partAt(page, asked.property, HELD, part)
    if (path === null) return { ok: false, why: noPartWhy(page, asked.property) }
    const read = await landing.readFiles([path])
    if (!read.ok) return { ok: false, why: `\`${path}\` did not come back: ${read.why}` }
    at ??= read.at
    const content = contentIn(read.bodies, path)
    if (content === null) {
      const tail = last ?? { part, path, lines: [] }
      return { ok: true, found: { at, touched, last: tail, places } }
    }
    const one: Part = { part, path, lines: [...jsonlLinesOf(content)] }
    last = one
    for (const [line, text] of one.lines.entries()) {
      const key = keyed.exec(text)?.[1]
      if (key === undefined || !wanted.has(key)) continue
      touched.set(part, one)
      places.set(key, [...(places.get(key) ?? []), [part, line]])
    }
  }
}

function lineOf(id: string, row: MineRow): string {
  return JSON.stringify({ id, ...row })
}

function bytesOf(lines: readonly string[]): number {
  return Buffer.byteLength(jsonlBodyOf(lines))
}

function composedPuts(
  page: string,
  asked: MineRows,
  found: Found,
  minted: () => string
): readonly Put[] {
  const byKey = new Map<string, MineRow>()
  for (const row of asked.rows) byKey.set(String(row[asked.key]), row)
  const parts = new Map<number, Part>(found.touched)
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
  return puts
}

async function pageOf(landing: MineLanding): Promise<string | { readonly why: string }> {
  const named = `${MINE_PAGE_TYPE}/${MINE_NAME}`
  const found = await landing.readPages([{ pageTypeSlug: MINE_PAGE_TYPE, slug: MINE_NAME }])
  if (!found.ok) return { why: `\`${named}\` did not come back: ${found.why}` }
  const page = found.bodies.find((one) => one.path.endsWith(PAGE_ENDING))?.path
  return page ?? { why: `no page is at \`${named}\`` }
}

export async function landMineRows(
  asked: MineRows,
  landing: MineLanding = LANDING
): Promise<MineKept> {
  const wanted = new Set(asked.rows.map((row) => String(row[asked.key])))
  if (wanted.size === 0) return { ok: true, kept: 0 }
  const page = await pageOf(landing)
  if (typeof page !== "string") return { ok: false, why: page.why }
  const said = `${wanted.size} mined ${asked.property}`
  const message = `temper: ${said} kept in ${MINE_PAGE_TYPE}/${MINE_NAME}`
  const tryOnce = async (): Promise<Tried> => {
    const read = await partsRead(page, asked, wanted, landing)
    if (!read.ok) return { outcome: "again", why: read.why }
    const puts = composedPuts(page, asked, read.found, landing.minted)
    const wrote = await landing.writeFiles(
      puts,
      PAGE_LANDING_WRITER,
      message,
      undefined,
      undefined,
      read.found.at
    )
    return triedFrom(wrote)
  }
  const landed = await landOverAttempts(`no attempt to keep ${said} was made`, tryOnce, {
    waiting: landing.waiting,
  })
  if (landed.outcome === "refused") return { ok: false, why: landed.why }
  return { ok: true, kept: wanted.size }
}
