import { beforeAll, describe, expect, test } from "bun:test"
import { askComposed } from "@shared/pages-query/ask"
import { loreLibraryData } from "@temper/game-completion/generated/lore-library-data.generated"
import { parseMotifBookName } from "@temper/game-items-core/motif-name-parser"

const PAGE_TYPE_SLUG = "temper-mined-item"
const MOTIF_BOOK_SPECIALIZED_TYPE = 60
const MOTIF_CHAPTER_SPECIALIZED_TYPE = 61
const CRAFTING_MOTIFS_CATEGORY_INDEX = 2

const MINED_ITEM_CEILING_MS = 60_000

function minedItemFetcher(url: string, init: RequestInit): Promise<Response> {
  return fetch(url, { ...init, signal: AbortSignal.timeout(MINED_ITEM_CEILING_MS) })
}

const NON_CANONICAL_TITLE_PATTERNS: readonly RegExp[] = [/, Tome Edition$/]

function isCanonicalMotifTitle(title: string): boolean {
  return !NON_CANONICAL_TITLE_PATTERNS.some((re) => re.test(title))
}

function isMotifShapedLoreName(name: string): boolean {
  return name.startsWith("Crafting Motif ") || name.startsWith("Crown Crafting Motif ")
}

type Tuple = { styleId: number; chapterId: number | null }
type TupleKey = string

function key(t: Tuple): TupleKey {
  return `${t.styleId}:${t.chapterId === null ? "B" : t.chapterId}`
}

function formatTuple(t: Tuple): string {
  return t.chapterId === null
    ? `style ${t.styleId} book`
    : `style ${t.styleId} chapter ${t.chapterId}`
}

let itemTuples: Map<TupleKey, Tuple>
let loreTuples: Map<TupleKey, Tuple>
let unparseableItemTitles: readonly string[]
let unparseableLoreNames: readonly string[]

async function loadMotifItemTitles(): Promise<readonly string[]> {
  const asked = await askComposed(
    {
      "page-type": PAGE_TYPE_SLUG,
      where: {
        specializedItemType: {
          in: [MOTIF_BOOK_SPECIALIZED_TYPE, MOTIF_CHAPTER_SPECIALIZED_TYPE].map(String),
        },
      },
      keys: ["title"],
    },
    minedItemFetcher
  )
  if (!asked.ok) throw new Error(asked.why)
  const titles: string[] = []
  for (const row of asked.answer.rows) {
    const title = row.values.title
    if (typeof title !== "string" || title.length === 0) continue
    if (!isCanonicalMotifTitle(title)) continue
    titles.push(title)
  }
  return titles
}

function buildItemTuples(titles: readonly string[]): {
  tuples: Map<TupleKey, Tuple>
  unparseable: readonly string[]
} {
  const tuples = new Map<TupleKey, Tuple>()
  const unparseable: string[] = []
  for (const title of titles) {
    const parsed = parseMotifBookName(title)
    if (parsed === undefined) {
      unparseable.push(title)
      continue
    }
    const t: Tuple = { styleId: parsed.styleId, chapterId: parsed.chapterId }
    tuples.set(key(t), t)
  }
  return { tuples, unparseable }
}

function buildLoreTuples(): { tuples: Map<TupleKey, Tuple>; unparseable: readonly string[] } {
  const tuples = new Map<TupleKey, Tuple>()
  const unparseable: string[] = []
  const category = loreLibraryData.find((c) => c.categoryIndex === CRAFTING_MOTIFS_CATEGORY_INDEX)
  if (category === undefined) return { tuples, unparseable }
  for (const collection of category.collections) {
    for (const book of collection.books) {
      if (!isMotifShapedLoreName(book.name)) continue
      const parsed = parseMotifBookName(book.name)
      if (parsed === undefined) {
        unparseable.push(book.name)
        continue
      }
      const t: Tuple = { styleId: parsed.styleId, chapterId: parsed.chapterId }
      tuples.set(key(t), t)
    }
  }
  return { tuples, unparseable }
}

function hasAnyChapterForStyle(set: Map<TupleKey, Tuple>, styleId: number): boolean {
  for (const t of set.values()) {
    if (t.styleId === styleId && t.chapterId !== null) return true
  }
  return false
}

function hasBookForStyle(set: Map<TupleKey, Tuple>, styleId: number): boolean {
  for (const t of set.values()) {
    if (t.styleId === styleId && t.chapterId === null) return true
  }
  return false
}

describe("motif item ↔ lorebook coverage", () => {
  beforeAll(async () => {
    const titles = await loadMotifItemTitles()
    const items = buildItemTuples(titles)
    const lore = buildLoreTuples()
    itemTuples = items.tuples
    unparseableItemTitles = items.unparseable
    loreTuples = lore.tuples
    unparseableLoreNames = lore.unparseable
  })

  test("every motif item title parses cleanly", () => {
    expect(unparseableItemTitles).toEqual([])
  })

  test("every lore-library motif entry parses cleanly", () => {
    expect(unparseableLoreNames).toEqual([])
  })

  test("items → lore: every item has lore coverage", () => {
    const missing: string[] = []
    for (const t of itemTuples.values()) {
      if (t.chapterId === null) {
        if (loreTuples.has(key(t))) continue
        if (hasAnyChapterForStyle(loreTuples, t.styleId)) continue
        missing.push(`${formatTuple(t)} (book item, no lore for style)`)
      } else {
        if (loreTuples.has(key(t))) continue
        missing.push(`${formatTuple(t)} (chapter item, no matching chapter lore)`)
      }
    }
    expect(missing).toEqual([])
  })

  test("lore → items: every lore entry has an item", () => {
    const missing: string[] = []
    for (const t of loreTuples.values()) {
      if (itemTuples.has(key(t))) continue
      if (t.chapterId !== null && hasBookForStyle(itemTuples, t.styleId)) {
        continue
      }
      missing.push(
        t.chapterId === null
          ? `${formatTuple(t)} (book lore, no book item)`
          : `${formatTuple(t)} (chapter lore, no matching chapter item)`
      )
    }
    expect(missing).toEqual([])
  })
})
