import type { SparseLoreLibrary } from "@akasha/temper-completion/completion-progress"
import { getSavedVariables } from "../saved-variables"
export function collectLoreLibrary(): undefined {
  const savedVars = getSavedVariables()
  const charEntry = savedVars.characters[GetCurrentCharacterId()]
  if (charEntry === undefined) return
  const loreLibrary: SparseLoreLibrary = {}

  for (let categoryIndex = 1; categoryIndex <= GetNumLoreCategories(); categoryIndex++) {
    const [, numCollections] = GetLoreCategoryInfo(categoryIndex)

    const collections: Record<number, number[]> = {}

    for (let collectionIndex = 1; collectionIndex <= numCollections; collectionIndex++) {
      const [collectionName, , , totalBooksInCollection] = GetLoreCollectionInfo(
        categoryIndex,
        collectionIndex
      )

      if (collectionName === "") continue

      const knownBooks: number[] = []

      for (let bookIndex = 1; bookIndex <= totalBooksInCollection; bookIndex++) {
        const [, , known] = GetLoreBookInfo(categoryIndex, collectionIndex, bookIndex)

        if (known) {
          knownBooks.push(bookIndex)
        }
      }

      if (knownBooks.length > 0) {
        collections[collectionIndex] = knownBooks
      }
    }

    if (Object.keys(collections).length > 0) {
      loreLibrary[categoryIndex] = collections
    }
  }

  charEntry.loreLibrary = loreLibrary
}

export function updateLoreBook(
  categoryIndex: number,
  collectionIndex: number,
  bookIndex: number
): undefined {
  const savedVars = getSavedVariables()
  const charEntry = savedVars.characters[GetCurrentCharacterId()]
  if (charEntry === undefined) return

  const loreLibrary = charEntry.loreLibrary
  if (loreLibrary === undefined) return

  let collections = loreLibrary[categoryIndex]
  if (collections === undefined) {
    collections = {}
    loreLibrary[categoryIndex] = collections
  }

  let books = collections[collectionIndex]
  if (books === undefined) {
    books = []
    collections[collectionIndex] = books
  }

  for (const idx of books) {
    if (idx === bookIndex) return
  }
  books.push(bookIndex)
}
