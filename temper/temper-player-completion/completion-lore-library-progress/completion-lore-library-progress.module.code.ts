import type {
  CharacterCompletion,
  LoreCategory,
} from "@akasha/temper-completion/completion-progress"
import { LORE_LIBRARY_DATA } from "@akasha/temper-completion/lore-library-data"
import type { CompletionCharacterRow } from "../completion-character-row/completion-character-row.module.code.ts"
import { isCharacterMeasured } from "../completion-measured/completion-measured.module.code.ts"
import type {
  CharacterLoreLibraryProgress,
  LoreCategoryProgress,
} from "../completion-ui-types/completion-ui-types.module.code.ts"

type LoreLibrary = NonNullable<CharacterCompletion["loreLibrary"]>

function isRichLoreCategory(value: LoreCategory | Record<number, number[]>): value is LoreCategory {
  return typeof value === "object" && value !== null && "name" in value
}

export function extractLoreKnownSet(loreLibrary: LoreLibrary): Set<string> {
  const knownSet = new Set<string>()

  for (const [catIdx, category] of Object.entries(loreLibrary)) {
    if (isRichLoreCategory(category)) {
      for (const [colIdx, collection] of Object.entries(category.collections)) {
        if (collection.books) {
          for (const [bookIdx, book] of Object.entries(collection.books)) {
            if (book.known) knownSet.add(`${catIdx}:${colIdx}:${bookIdx}`)
          }
        }
      }
    } else {
      for (const [colIdx, bookIndices] of Object.entries(category)) {
        if (Array.isArray(bookIndices)) {
          for (const bookIdx of bookIndices) {
            knownSet.add(`${catIdx}:${colIdx}:${bookIdx}`)
          }
        } else if (typeof bookIndices === "object" && bookIndices !== null) {
          for (const bookIdx of Object.values(bookIndices)) {
            knownSet.add(`${catIdx}:${colIdx}:${bookIdx}`)
          }
        }
      }
    }
  }

  return knownSet
}

export function countLoreLibrary(
  loreLibrary: LoreLibrary,
  itemPath?: readonly (string | number)[]
): { current: number; total: number } {
  const knownSet = extractLoreKnownSet(loreLibrary)
  const categoryFilter = itemPath?.[0] !== undefined ? Number(itemPath[0]) : null
  const collectionFilter = itemPath?.[1] !== undefined ? Number(itemPath[1]) : null

  let current = 0
  let total = 0
  for (const cat of LORE_LIBRARY_DATA) {
    if (categoryFilter !== null && cat.categoryIndex !== categoryFilter) continue
    for (const col of cat.collections) {
      if (collectionFilter !== null && col.collectionIndex !== collectionFilter) continue
      for (const book of col.books) {
        total++
        if (knownSet.has(`${cat.categoryIndex}:${col.collectionIndex}:${book.bookIndex}`)) current++
      }
    }
  }
  return { current, total }
}

export function isLoreLibraryItemComplete(
  completion: CharacterCompletion | null,
  itemPath: readonly (string | number)[]
): boolean {
  if (!completion || itemPath.length === 0) return false
  const ll = completion.loreLibrary
  if (!ll) return false
  const { current, total } = countLoreLibrary(ll, itemPath)
  return total > 0 && current === total
}

function buildCategories(knownSet: Set<string>): {
  categories: readonly LoreCategoryProgress[]
  knownCount: number
  totalBooks: number
} {
  let totalKnown = 0
  let totalBooks = 0

  const categories = LORE_LIBRARY_DATA.map((cat) => {
    let catKnown = 0
    let catTotal = 0

    const collections = cat.collections.map((col) => {
      const books = col.books.map((book) => ({
        bookIndex: book.bookIndex,
        name: book.name,
        known: knownSet.has(`${cat.categoryIndex}:${col.collectionIndex}:${book.bookIndex}`),
      }))
      const knownCount = books.filter((b) => b.known).length
      catKnown += knownCount
      catTotal += books.length
      return {
        collectionIndex: col.collectionIndex,
        name: col.name,
        knownCount,
        totalBooks: books.length,
        books,
      }
    })

    totalKnown += catKnown
    totalBooks += catTotal
    return {
      categoryIndex: cat.categoryIndex,
      name: cat.name,
      collections,
      knownCount: catKnown,
      totalBooks: catTotal,
    }
  })

  return { categories, knownCount: totalKnown, totalBooks }
}

export function transformLoreLibraryProgress(
  rows: readonly CompletionCharacterRow[]
): readonly CharacterLoreLibraryProgress[] {
  if (LORE_LIBRARY_DATA.length === 0) return []

  const result: CharacterLoreLibraryProgress[] = []

  for (const row of rows) {
    const completion = row.completion
    if (!completion || !isCharacterMeasured(completion)) continue

    const loreLibrary = completion.loreLibrary
    const knownSet = loreLibrary ? extractLoreKnownSet(loreLibrary) : new Set<string>()
    const { categories, knownCount, totalBooks } = buildCategories(knownSet)

    result.push({
      characterId: row.id,
      categories,
      knownCount,
      totalBooks,
    })
  }

  return result
}
