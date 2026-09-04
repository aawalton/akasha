import "@akasha/temper-eso-types/eso-functions-05"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/tstl-language-extensions"

import type {
  LoreLibraryCatalogBook,
  LoreLibraryCatalogCategory,
  LoreLibraryCatalogCollection,
} from "@akasha/temper-capture-shapes/lore-library-catalog"
import { registerCatalogDomain } from "@akasha/temper-catalog-core/domain-registry"
import { getSavedVariables } from "@akasha/temper-catalog-core/saved-variables-accessor"

const COLLECTION_BOOK_PROBE_CEILING = 100

export function collectLoreLibraryCatalog(this: void, onComplete: (this: void) => void): undefined {
  const savedVars = getSavedVariables()
  const catalog: Record<number, LoreLibraryCatalogCategory> = {}

  for (let categoryIndex = 1; categoryIndex <= GetNumLoreCategories(); categoryIndex++) {
    const [rawCategoryName, numCollections] = GetLoreCategoryInfo(categoryIndex)
    const categoryName =
      rawCategoryName !== undefined ? zo_strformat("<<1>>", rawCategoryName) : rawCategoryName
    if (categoryName === undefined || categoryName === "") continue

    const collections: Record<number, LoreLibraryCatalogCollection> = {}

    for (let collectionIndex = 1; collectionIndex <= numCollections; collectionIndex++) {
      const [collectionName] = GetLoreCollectionInfo(categoryIndex, collectionIndex)

      const books: Record<number, LoreLibraryCatalogBook> = {}

      for (let bookIndex = 1; bookIndex <= COLLECTION_BOOK_PROBE_CEILING; bookIndex++) {
        const [rawBookTitle] = GetLoreBookInfo(categoryIndex, collectionIndex, bookIndex)
        const bookTitle =
          rawBookTitle !== undefined ? zo_strformat("<<1>>", rawBookTitle) : rawBookTitle
        if (bookTitle === undefined || bookTitle === "") continue
        books[bookIndex] = { name: bookTitle }
      }

      if (Object.keys(books).length > 0) {
        collections[collectionIndex] = {
          name: collectionName !== undefined ? zo_strformat("<<1>>", collectionName) : "",
          books,
        }
      }
    }

    if (Object.keys(collections).length > 0) {
      catalog[categoryIndex] = { name: categoryName, collections }
    }
  }

  savedVars.loreLibraryCatalog = catalog
  onComplete()
}
registerCatalogDomain({ key: "loreLibraryCatalog", collect: collectLoreLibraryCatalog })
