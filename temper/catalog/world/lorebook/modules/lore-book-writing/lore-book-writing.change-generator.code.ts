import type { Replacing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { besideAt, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { partsReading } from "akasha/page/modules/file-parts/page-file-parts.module.code.ts"
import { type Shadow, shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"
import {
  assignedText,
  bytesOf,
  CAPTURED_PART_BYTES,
  type Collection,
  collectionBlock,
  collectionsText,
  entryLine,
  type Imported,
  importLines,
  listSpreadText,
  literal,
  PART_BYTES,
  partText,
  quoted,
  splitOver,
  spreadText,
  tableOf,
} from "akasha/temper/catalog/world/lorebook/modules/lore-book-rendering/lore-book-rendering.module.code.ts"
import {
  type BookRead,
  type CollectionRead,
  type Keyed,
  type Row,
  type Tables,
  tablesOf,
} from "akasha/temper/catalog/world/lorebook/modules/lore-book-tables/lore-book-tables.module.code.ts"
import { padTwo } from "akasha/text/writing/modules/pad-two/pad-two.module.code.ts"
import { z } from "zod"

const ROW = z.record(z.string(), z.unknown())

const BOOK = "temper-lore-book"
const COLLECTION = "temper-lore-collection"
const MODULE = "module"
const JSONL = "jsonl"
const POSITIONS = "positions"
const PINS = "shalidor-pins"
const ASSIGNED_AT_ONCE = 10
const LOREBOOK_TYPES =
  "akasha/temper/catalog/world/lorebook/modules/lorebooks-types/lorebooks-types.module.code.ts"
const CAPTURED_TYPES =
  "akasha/temper/player/completion/modules/lore-library-types/lore-library-types.module.code.ts"

type Written = {
  readonly edits: readonly Replacing[]
  readonly said: readonly string[]
}

const NOTHING: Written = { edits: [], said: [] }

type Part = { readonly code: string; readonly name: string }

type Planned = { readonly code: string; readonly text: string }

type Outcome = { readonly planned: readonly Planned[]; readonly said: readonly string[] }

type Table = {
  readonly stem: string
  readonly exported: string
  readonly typeName: string
}

const BOOK_TABLE: Table = {
  stem: "lorebooks-book-data",
  exported: "BOOK_DATA",
  typeName: "EideticBookTable",
}

const SHALIDOR_TABLE: Table = {
  stem: "lorebooks-shalidor-locations",
  exported: "SHALIDOR_LOCATIONS",
  typeName: "ShalidorDataTable",
}

const LIBRARY_TABLE: Table = {
  stem: "lorebooks-library-data",
  exported: "LIBRARY_DATA",
  typeName: "EideticLibraryCategory",
}

function codeOf(shadow: Shadow, slug: string): string | null {
  const listed = shadow.index.listedAt(MODULE, slug)
  const at = listed.length === 1 ? listed[0]?.path : undefined
  return at === undefined ? null : besideAt(at, "code", "ts")
}

function partsOf(shadow: Shadow, stem: string, exported: string): Part[] {
  const parts: Part[] = []
  for (let at = 0; ; at += 1) {
    const code = codeOf(shadow, `${stem}-${padTwo(at)}`)
    if (code === null) return parts
    parts.push({ code, name: `${exported}_${padTwo(at)}` })
  }
}

function importsOf(parts: readonly Part[]): Imported[] {
  return parts.map((one) => ({ name: one.name, from: `akasha/${one.code}` }))
}

function rowsOf(change: Change, path: string, slug: string): Row[] {
  const rows: Row[] = []
  for (const [, text] of partsReading(path, slug, JSONL, (at) => textOf(change.after(at)))) {
    for (const line of text.split("\n"))
      if (line.trim() !== "") rows.push(ROW.parse(JSON.parse(line)))
  }
  return rows
}

function tablesIn(change: Change, shadow: Shadow): Tables {
  const collections: CollectionRead[] = []
  for (const one of shadow.index.everyOfType(COLLECTION)) {
    const value = shadow.pageOf(one.path)
    if (value !== null) collections.push({ address: `${COLLECTION}/${String(value.slug)}`, value })
  }
  const books: BookRead[] = []
  for (const one of shadow.index.everyOfType(BOOK)) {
    const value = shadow.pageOf(one.path)
    if (value === null) continue
    const positions = value.positions === JSONL ? rowsOf(change, one.path, POSITIONS) : []
    const pins = value.shalidorPins === JSONL ? rowsOf(change, one.path, PINS) : []
    books.push({ value, positions, pins })
  }
  return tablesOf(books, collections)
}

function namesOver(
  parts: readonly Part[],
  split: readonly (readonly [number, number])[]
): Map<number, string[]> {
  const named = new Map<number, string[]>()
  let at = 0
  for (const [group, many] of split) {
    named.set(
      group,
      parts.slice(at, at + many).map((one) => one.name)
    )
    at += many
  }
  return named
}

function keyedParts(
  shadow: Shadow,
  table: Table,
  groups: readonly (readonly [number, Keyed])[],
  whole: (parts: readonly Part[], split: readonly (readonly [number, number])[]) => string
): Outcome {
  const parts = partsOf(shadow, table.stem, table.exported)
  const wholeAt = codeOf(shadow, table.stem)
  if (wholeAt === null || parts.length === 0) {
    return { planned: [], said: [`no module holds the ${table.stem} parts, so none was written`] }
  }
  const overhead = bytesOf(partText(table.typeName, LOREBOOK_TYPES, parts[0]?.name ?? "", "{\n}"))
  const bodies: Keyed[] = []
  const split: [number, number][] = []
  for (const [group, items] of groups) {
    const made = splitOver(items, PART_BYTES, overhead, ([key, value]) =>
      bytesOf(entryLine(key, value))
    )
    split.push([group, made.length])
    bodies.push(...made)
  }
  if (bodies.length > parts.length) {
    const needs = `${String(bodies.length)} parts and ${String(parts.length)} modules hold them`
    return { planned: [], said: [`${table.stem} needs ${needs}, so it was left as it is`] }
  }
  const planned = parts.map((one, at) => ({
    code: one.code,
    text: partText(
      table.typeName,
      LOREBOOK_TYPES,
      one.name,
      literal(tableOf(bodies[at] ?? []), "")
    ),
  }))
  planned.push({ code: wholeAt, text: whole(parts, split) })
  return { planned, said: [] }
}

function bookData(shadow: Shadow, tables: Tables): Outcome {
  return keyedParts(shadow, BOOK_TABLE, [[0, tables.books]], (parts) => {
    const names = parts.map((one) => one.name)
    return (
      `${importLines(importsOf(parts), BOOK_TABLE.typeName, LOREBOOK_TYPES)}\n` +
      `export const BOOK_DATA: EideticBookTable = {}\n\n` +
      `${assignedText("BOOK_DATA", names, ASSIGNED_AT_ONCE)}\n`
    )
  })
}

function shalidorData(shadow: Shadow, tables: Tables): Outcome {
  return keyedParts(shadow, SHALIDOR_TABLE, [[0, tables.shalidor]], (parts) => {
    const names = parts.map((one) => one.name)
    return (
      `${importLines(importsOf(parts), SHALIDOR_TABLE.typeName, LOREBOOK_TYPES)}\n` +
      `export const SHALIDOR_LOCATIONS: ShalidorDataTable = {\n${spreadText(names, "  ")}}\n`
    )
  })
}

function libraryData(shadow: Shadow, tables: Tables): Outcome {
  return keyedParts(shadow, LIBRARY_TABLE, tables.library, (parts, split) => {
    const named = namesOver(parts, split)
    const blocks = [...named].map(
      ([category, names]) => `  [${String(category)}]: {\n${spreadText(names, "    ")}  },\n`
    )
    return (
      `${importLines(importsOf(parts), "EideticLibraryTable", LOREBOOK_TYPES)}\n` +
      `export const LIBRARY_DATA: EideticLibraryTable = {\n${blocks.join("")}}\n`
    )
  })
}

function capturedPart(name: string, collections: readonly Collection[]): string {
  return (
    `import type { LoreCollectionEntry } from "${CAPTURED_TYPES}"\n\n` +
    `export const ${name}: readonly LoreCollectionEntry[] = ${collectionsText(collections)}\n`
  )
}

const EMPTY: Collection = { collectionIndex: 0, name: "", books: [] }

function capturedData(shadow: Shadow, tables: Tables): Outcome {
  const parts = partsOf(shadow, "lore-collections", "LORE_COLLECTIONS")
  const wholeAt = codeOf(shadow, "lore-library-data")
  if (wholeAt === null || parts.length === 0) {
    return {
      planned: [],
      said: ["no module holds the lore-collections parts, so none was written"],
    }
  }
  const overhead =
    bytesOf(capturedPart(parts[0]?.name ?? "", [EMPTY])) - bytesOf(collectionBlock(EMPTY))
  const bodies: Collection[][] = []
  const split: [number, number][] = []
  for (const category of tables.captured) {
    const made = splitOver(category.collections, CAPTURED_PART_BYTES, overhead, (one) =>
      bytesOf(collectionBlock(one))
    )
    split.push([category.categoryIndex, made.length])
    bodies.push(...made)
  }
  if (bodies.length > parts.length) {
    const needs = `${String(bodies.length)} parts and ${String(parts.length)} modules hold them`
    return { planned: [], said: [`lore-collections needs ${needs}, so it was left as it is`] }
  }
  const named = namesOver(parts, split)
  const blocks = tables.captured.map(
    (category) =>
      `  {\n    categoryIndex: ${String(category.categoryIndex)},\n    name: ${quoted(category.name)},\n` +
      `${listSpreadText(named.get(category.categoryIndex) ?? [], "    collections: ")}  },\n`
  )
  const planned = parts.map((one, at) => ({
    code: one.code,
    text: capturedPart(one.name, bodies[at] ?? []),
  }))
  planned.push({
    code: wholeAt,
    text:
      `${importLines(importsOf(parts), "LoreCategoryEntry", CAPTURED_TYPES)}\n` +
      `export const LORE_LIBRARY_DATA: readonly LoreCategoryEntry[] = [\n${blocks.join("")}]\n`,
  })
  return { planned, said: [] }
}

export function couldTurn(change: Change): boolean {
  return change.changed.some((path) => {
    const said = partedIn(path)
    return said !== null && (said.pageType === BOOK || said.pageType === COLLECTION)
  })
}

function writtenOver(change: Change, shadow: Shadow): Written {
  const tables = tablesIn(change, shadow)
  const outcomes = [bookData, shalidorData, libraryData, capturedData].map((one) =>
    one(shadow, tables)
  )
  const edits: Replacing[] = []
  const said: string[] = outcomes.flatMap((one) => one.said)
  for (const one of outcomes.flatMap((outcome) => outcome.planned)) {
    const was = textOf(change.after(one.code))
    if (was === null || was === one.text) continue
    edits.push({ kind: "replace", path: one.code, contentFrom: was, contentTo: one.text })
    said.push(`\`${one.code}\` was written again from the lore book pages`)
  }
  return { edits, said }
}

export function generateChange(change: Change): Written {
  try {
    if (!couldTurn(change)) return NOTHING
    const cast = shadowFor(change)
    if ("refused" in cast) return NOTHING
    return writtenOver(change, cast.shadow)
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return { edits: [], said: [`no lore book table was written — ${why}`] }
  }
}
