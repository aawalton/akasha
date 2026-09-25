import { parseNumber as num } from "akasha/code/type/narrowing/modules/parse-number/parse-number.module.code.ts"
import { stringIn as text } from "akasha/code/type/narrowing/modules/string-in/string-in.module.code.ts"

export type Row = Readonly<Record<string, unknown>>

export type BookRead = {
  readonly value: Row
  readonly positions: readonly Row[]
  readonly pins: readonly Row[]
}

export type CollectionRead = {
  readonly address: string
  readonly value: Row
}

export type Keyed = readonly (readonly [number, unknown])[]

export type Captured = {
  readonly categoryIndex: number
  readonly name: string
  readonly collections: readonly {
    readonly collectionIndex: number
    readonly name: string
    readonly books: readonly { readonly bookIndex: number; readonly name: string }[]
  }[]
}

export type Tables = {
  readonly books: Keyed
  readonly shalidor: Keyed
  readonly library: readonly (readonly [number, Keyed])[]
  readonly captured: readonly Captured[]
}

export const CATEGORY_NAMES: Readonly<Record<number, string>> = {
  1: "Shalidor's Library",
  2: "Crafting Motifs",
  3: "Eidetic Memory",
}

const SHALIDOR = 1

const PLACE_KEYS: Readonly<Record<string, string>> = {
  mapId: "pm",
  mapX: "px",
  mapY: "py",
  zoneMapId: "zm",
  zoneX: "zx",
  zoneY: "zy",
  dungeon: "d",
  locationDetail: "ld",
  mn: "mn",
  fp: "fp",
  qc: "qc",
  qp: "qp",
  l: "l",
  r: "r",
  x: "x",
  y: "y",
  z: "z",
  pnx: "pnx",
  pny: "pny",
  zt: "zt",
  i: "i",
  sm: "sm",
  alternate: "4",
}

function sortedOver(pairs: readonly (readonly [string, unknown])[]): Record<string, unknown> {
  const held: Record<string, unknown> = {}
  for (const [key, value] of [...pairs].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))) {
    held[key] = value
  }
  return held
}

export function placeOf(row: Row): Record<string, unknown> {
  const pairs: [string, unknown][] = []
  for (const [key, value] of Object.entries(row)) {
    const said = PLACE_KEYS[key]
    if (said === undefined) continue
    pairs.push([said, key === "alternate" ? placeOf(value as Row) : value])
  }
  return sortedOver(pairs)
}

function bookEntry(read: BookRead, id: number, cn: string | null): Record<string, unknown> {
  const v = read.value
  const pairs: [string, unknown][] = [["e", read.positions.map(placeOf)]]
  if (typeof v.charted === "boolean") pairs.push(["c", v.charted])
  if (cn !== null) pairs.push(["cn", cn])
  if (v.keyed === true) pairs.push(["k", id])
  if (typeof v.loreBooksL === "boolean") pairs.push(["l", v.loreBooksL])
  const counts = Array.isArray(v.mapCounts) ? (v.mapCounts as Row[]) : []
  if (counts.length > 0) {
    const m: Record<string, unknown> = {}
    for (const one of counts) m[String(one.mapId)] = one.mapCount ?? one.mapFlagged
    pairs.push(["m", m])
  }
  const n = text(v.title) ?? num(v.numberedTitle)
  if (n !== undefined) pairs.push(["n", n])
  if (num(v.quest) !== undefined) pairs.push(["q", v.quest])
  if (typeof v.onBookshelves === "boolean") pairs.push(["r", v.onBookshelves])
  return sortedOver(pairs)
}

function pinEntry(row: Row, collectionIndex: number, bookIndex: number): Record<string, unknown> {
  const pin: Record<string, unknown> = {
    1: row.mapX,
    2: row.mapY,
    3: collectionIndex,
    4: bookIndex,
  }
  if (row.esoZoneId !== undefined) pin[5] = row.esoZoneId
  if (row.shalidor6 !== undefined) pin[6] = row.shalidor6
  if (row.locationDetails !== undefined) pin.ld = row.locationDetails
  if (row.worldY !== undefined) pin.worldY = row.worldY
  return pin
}

function byNumber<T>(pairs: Iterable<readonly [number, T]>): (readonly [number, T])[] {
  return [...pairs].sort(([a], [b]) => a - b)
}

export function tablesOf(
  books: readonly BookRead[],
  collections: readonly CollectionRead[]
): Tables {
  const collectionAt = new Map(collections.map((one) => [one.address, one.value]))
  const bookTable = new Map<number, unknown>()
  const maps = new Map<number, [number, Record<string, unknown>][]>()
  const capturedBooks = new Map<string, [number, string][]>()
  for (const read of books) {
    const said = text(read.value.collection)
    const collection = said === null ? undefined : collectionAt.get(said)
    const id = num(read.value.esoBookId)
    if (id !== undefined) bookTable.set(id, bookEntry(read, id, text(collection?.title)))
    const bookIndex = num(read.value.bookIndex)
    const title = text(read.value.title)
    if (said !== null && bookIndex !== undefined && title !== null) {
      capturedBooks.set(said, [...(capturedBooks.get(said) ?? []), [bookIndex, title]])
    }
    const collectionIndex = num(collection?.esoCollectionIndex)
    if (collectionIndex === undefined || bookIndex === undefined) continue
    if (num(collection?.esoLoreCategoryId) !== SHALIDOR) continue
    for (const row of read.pins) {
      const mapId = num(row.mapId) ?? 0
      const held = maps.get(mapId) ?? []
      held.push([num(row.mapOrder) ?? 0, pinEntry(row, collectionIndex, bookIndex)])
      maps.set(mapId, held)
    }
  }
  const library = new Map<number, [number, unknown][]>()
  const captured = new Map<number, Captured["collections"][number][]>()
  for (const one of collections) {
    const v = one.value
    const category = num(v.esoLoreCategoryId)
    const index = num(v.esoCollectionIndex)
    if (category === undefined || index === undefined) continue
    const name = text(v.title) ?? ""
    const inCategory = captured.get(category) ?? []
    const listed = byNumber(capturedBooks.get(one.address) ?? [])
    inCategory.push({
      collectionIndex: index,
      name,
      books: listed.map(([bookIndex, title]) => ({ bookIndex, name: title })),
    })
    captured.set(category, inCategory)
    if (num(v.esoLoreCollectionId) === undefined) continue
    const entry = {
      d: v.loreCollectionDescription,
      g: v.gamepadIcon,
      h: v.hidden,
      k: v.esoLoreCollectionId,
      n: name,
      t: v.bookTotal,
    }
    library.set(category, [...(library.get(category) ?? []), [index, entry]])
  }
  return {
    books: byNumber(bookTable),
    shalidor: byNumber(maps).map(
      ([mapId, held]) => [mapId, byNumber(held).map(([, pin]) => pin)] as const
    ),
    library: byNumber(library).map(([category, held]) => [category, byNumber(held)] as const),
    captured: byNumber(captured).map(([categoryIndex, held]) => ({
      categoryIndex,
      name: CATEGORY_NAMES[categoryIndex] ?? "",
      collections: [...held].sort((a, b) => a.collectionIndex - b.collectionIndex),
    })),
  }
}
