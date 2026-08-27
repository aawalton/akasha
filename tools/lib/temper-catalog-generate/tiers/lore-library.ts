
import { catalogSchema, CATALOG_SAVED_VARIABLES, type Tier, type TierEmit } from "../harness.ts"
import { dataError } from "../../exit.ts"

const SCHEMA_REF = "@temper/game-collections-lore-capture-host/saved-variables-schema"

interface LoreLibraryCatalogBook {
  name: string
}

interface LoreLibraryCatalogCollection {
  name: string
  books: Record<number, LoreLibraryCatalogBook>
}

interface LoreLibraryCatalogCategory {
  name: string
  collections: Record<number, LoreLibraryCatalogCollection>
}

type LoreLibraryCatalog = Record<number, LoreLibraryCatalogCategory>

type CategoryMap = Map<
  number,
  {
    name: string
    collections: Map<number, { name: string; books: Map<number, string> }>
  }
>

async function extractLoreLibraryFromSavedVars(
  accountWide: Record<string, unknown>
): Promise<CategoryMap> {
  const loreLibraryCatalogSchema = await catalogSchema<LoreLibraryCatalog>(
    SCHEMA_REF,
    "loreLibraryCatalogSchema"
  )

  if (!accountWide.loreLibraryCatalog)
    throw dataError(
      "No loreLibraryCatalog found. Deploy the TemperCatalog addon and log in to collect it."
    )

  const parsed = loreLibraryCatalogSchema.parse(accountWide.loreLibraryCatalog)

  const categoryMap: CategoryMap = new Map()

  for (const [catIdxStr, category] of Object.entries(parsed)) {
    const catIdx = Number(catIdxStr)
    const collectionsMap = new Map<number, { name: string; books: Map<number, string> }>()

    for (const [colIdxStr, collection] of Object.entries(category.collections)) {
      const colIdx = Number(colIdxStr)

      const booksMap = new Map<number, string>()
      for (const [bookIdxStr, book] of Object.entries(collection.books)) {
        booksMap.set(Number(bookIdxStr), book.name)
      }

      if (booksMap.size > 0) {
        collectionsMap.set(colIdx, { name: collection.name, books: booksMap })
      }
    }

    if (collectionsMap.size > 0) {
      categoryMap.set(catIdx, { name: category.name, collections: collectionsMap })
    }
  }

  return categoryMap
}

function generateDataFile(
  categoryMap: Map<
    number,
    {
      name: string
      collections: Map<number, { name: string; books: Map<number, string> }>
    }
  >,
  apiVersion: string
): string {
  const sortedCategories = [...categoryMap.entries()].sort((a, b) => a[0] - b[0])

  let totalBooks = 0
  let totalCollections = 0

  const categoryLines: string[] = []

  for (const [catIdx, cat] of sortedCategories) {
    const sortedCollections = [...cat.collections.entries()].sort((a, b) => a[0] - b[0])

    const collectionLines: string[] = []
    for (const [colIdx, col] of sortedCollections) {
      const sortedBooks = [...col.books.entries()].sort((a, b) => a[0] - b[0])
      if (sortedBooks.length === 0) continue

      totalBooks += sortedBooks.length
      totalCollections++

      const bookLines = sortedBooks.map(
        ([bookIdx, name]) => `        { bookIndex: ${bookIdx}, name: ${JSON.stringify(name)} }`
      )

      collectionLines.push(
        `      { collectionIndex: ${colIdx}, name: ${JSON.stringify(col.name)}, books: [\n${bookLines.join(",\n")}\n      ]}`
      )
    }

    if (collectionLines.length === 0) continue

    categoryLines.push(
      `  { categoryIndex: ${catIdx}, name: ${JSON.stringify(cat.name)}, collections: [\n${collectionLines.join(",\n")}\n  ]}`
    )
  }

  return `\
/**
 * Lore Library Static Data (Generated)
 *
 * ${sortedCategories.length} categories, ${totalCollections} collections, ${totalBooks} books
 *
 * apiVersion: ${apiVersion}
 * DO NOT EDIT — regenerate with: ops temper catalog generate lore-library
 */

interface LoreBookEntry {
  bookIndex: number
  name: string
}

interface LoreCollectionEntry {
  collectionIndex: number
  name: string
  books: readonly LoreBookEntry[]
}

interface LoreCategoryEntry {
  categoryIndex: number
  name: string
  collections: readonly LoreCollectionEntry[]
}

export const loreLibraryData: LoreCategoryEntry[] = [
${categoryLines.join(",\n")}
]
`
}

export const tier: Tier = {
  slug: "lore-library",
  summary: "Mages Guild lore books, by category and collection",
  savedVariables: CATALOG_SAVED_VARIABLES,
  outputPath: "packages/temper/game/completion/src/generated/lore-library-data.generated.ts",
  format: false,
  emit: async (accountWide, apiVersion): Promise<TierEmit> => {
    const categoryMap = await extractLoreLibraryFromSavedVars(accountWide)

    return {
      content: generateDataFile(categoryMap, apiVersion),
      report: [`Found ${categoryMap.size} categories (apiVersion: ${apiVersion})`],
    }
  },
}
