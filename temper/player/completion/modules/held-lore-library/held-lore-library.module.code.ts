import {
  numberAt,
  slugAt,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { temperLoreCategory } from "akasha/temper/catalog/pursuit/temper-lore-category/temper-lore-category.page-type.ts"
import { temperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.ts"
import { temperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.ts"
import type {
  LoreCategoryEntry,
  LoreCollectionEntry,
} from "akasha/temper/player/completion/modules/lore-library-types/lore-library-types.module.code.ts"

export type LoreLibrary = readonly LoreCategoryEntry[]

type Book = LoreCollectionEntry["books"][number]

export const LORE_LIBRARY_READS: readonly (readonly [string, readonly string[]])[] = [
  [temperLoreCategory.slug, ["esoLoreCategoryId", "title"]],
  [temperLoreCollection.slug, ["slug", "esoLoreCategoryId", "esoCollectionIndex", "title"]],
  [temperLoreBook.slug, ["collection", "bookIndex", "title"]],
]

function booksBySlug(rows: readonly Value[]): Map<string, Book[]> {
  const books = new Map<string, Book[]>()
  for (const row of rows) {
    const collection = slugAt(row, "collection")
    const bookIndex = numberAt(row, "bookIndex")
    const name = textAt(row, "title")
    if (collection === null || bookIndex === null || name === null) continue
    const held = books.get(collection)
    if (held === undefined) books.set(collection, [{ bookIndex, name }])
    else held.push({ bookIndex, name })
  }
  return books
}

export function loreLibraryFrom(rowsOf: (pageTypeSlug: string) => readonly Value[]): LoreLibrary {
  const names = new Map<number, string>()
  for (const row of rowsOf(temperLoreCategory.slug)) {
    const index = numberAt(row, "esoLoreCategoryId")
    if (index !== null) names.set(index, textAt(row, "title") ?? "")
  }
  const books = booksBySlug(rowsOf(temperLoreBook.slug))
  const collections = new Map<number, LoreCollectionEntry[]>()
  for (const row of rowsOf(temperLoreCollection.slug)) {
    const category = numberAt(row, "esoLoreCategoryId")
    const collectionIndex = numberAt(row, "esoCollectionIndex")
    const slug = textAt(row, "slug")
    if (category === null || collectionIndex === null || slug === null) continue
    const listed = [...(books.get(slug) ?? [])].sort((a, b) => a.bookIndex - b.bookIndex)
    const entry = { collectionIndex, name: textAt(row, "title") ?? "", books: listed }
    const held = collections.get(category)
    if (held === undefined) collections.set(category, [entry])
    else held.push(entry)
  }
  return [...collections]
    .sort(([a], [b]) => a - b)
    .map(([categoryIndex, held]) => ({
      categoryIndex,
      name: names.get(categoryIndex) ?? "",
      collections: held.sort((a, b) => a.collectionIndex - b.collectionIndex),
    }))
}

let held: LoreLibrary | null = null

export function holdLoreLibrary(library: LoreLibrary): LoreLibrary {
  held = library
  return library
}

export function heldLoreLibrary(): LoreLibrary | null {
  return held
}

const UNREAD =
  "the lore library is read from pages, and nothing has read it yet — await `loadLoreLibrary()` where the work starts, or hold it before the work starts"

export function loreLibrary(): LoreLibrary {
  if (held !== null) return held
  throw new Error(UNREAD)
}
