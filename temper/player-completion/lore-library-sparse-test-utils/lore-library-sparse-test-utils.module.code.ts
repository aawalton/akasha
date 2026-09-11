import { LORE_LIBRARY_DATA } from "akasha/temper/completion/lore-library-data/lore-library-data.module.code.ts"

export function sparseComplete(categoryIndex: number): Record<number, Record<number, number[]>> {
  const category = LORE_LIBRARY_DATA.find((entry) => entry.categoryIndex === categoryIndex)
  if (!category) throw new Error(`no lore category ${categoryIndex}`)
  const collections: Record<number, number[]> = {}
  for (const collection of category.collections) {
    collections[collection.collectionIndex] = collection.books.map((book) => book.bookIndex)
  }
  return { [categoryIndex]: collections }
}

export function sparseMissingOne(categoryIndex: number): Record<number, Record<number, number[]>> {
  const library = sparseComplete(categoryIndex)
  const category = LORE_LIBRARY_DATA.find((entry) => entry.categoryIndex === categoryIndex)
  if (!category) throw new Error(`no lore category ${categoryIndex}`)
  const firstCollection = category.collections[0]
  if (!firstCollection) throw new Error("category has no collections")
  const collections = library[categoryIndex]
  if (!collections) throw new Error("sparse build missing category")
  const books = collections[firstCollection.collectionIndex]
  if (!books) throw new Error("sparse build missing collection")
  collections[firstCollection.collectionIndex] = books.slice(1)
  return library
}
