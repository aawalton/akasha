import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
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

function titleOf(row: Value): string {
  const title = row.title
  return typeof title === "string" ? title : ""
}

function booksByCollection(rows: readonly Value[]): Map<string, Book[]> {
  const books = new Map<string, Book[]>()
  for (const row of rows) {
    const { collection, bookIndex, title } = row
    if (typeof collection !== "string" || typeof bookIndex !== "number") continue
    if (typeof title !== "string") continue
    const held = books.get(collection)
    if (held === undefined) books.set(collection, [{ bookIndex, name: title }])
    else held.push({ bookIndex, name: title })
  }
  return books
}

export function loreLibraryFrom(rowsOf: (pageTypeSlug: string) => readonly Value[]): LoreLibrary {
  const names = new Map<number, string>()
  for (const row of rowsOf(temperLoreCategory.slug)) {
    const index = row.esoLoreCategoryId
    if (typeof index === "number") names.set(index, titleOf(row))
  }
  const books = booksByCollection(rowsOf(temperLoreBook.slug))
  const collections = new Map<number, LoreCollectionEntry[]>()
  for (const row of rowsOf(temperLoreCollection.slug)) {
    const { esoLoreCategoryId: category, esoCollectionIndex: collectionIndex, slug } = row
    if (typeof category !== "number" || typeof collectionIndex !== "number") continue
    if (typeof slug !== "string") continue
    const address = `${temperLoreCollection.slug}/${slug}`
    const listed = [...(books.get(address) ?? [])].sort((a, b) => a.bookIndex - b.bookIndex)
    const entry = { collectionIndex, name: titleOf(row), books: listed }
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
