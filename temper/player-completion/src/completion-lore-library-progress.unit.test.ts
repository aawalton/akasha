import { describe, expect, it } from "bun:test"
import type { CharacterCompletion, LoreCategory } from "@temper/game-completion/completion-types"
import { loreLibraryData } from "@temper/game-completion/generated/lore-library-data.generated"
import { extractLoreKnownSet, isLoreLibraryItemComplete } from "./completion-lore-library-progress"

const CATEGORY = 1

function sparseComplete(categoryIndex: number): Record<number, Record<number, number[]>> {
  const cat = loreLibraryData.find((c) => c.categoryIndex === categoryIndex)
  if (!cat) throw new Error(`no lore category ${categoryIndex}`)
  const collections: Record<number, number[]> = {}
  for (const col of cat.collections) {
    collections[col.collectionIndex] = col.books.map((b) => b.bookIndex)
  }
  return { [categoryIndex]: collections }
}

function sparseMissingOne(categoryIndex: number): Record<number, Record<number, number[]>> {
  const ll = sparseComplete(categoryIndex)
  const cat = loreLibraryData.find((c) => c.categoryIndex === categoryIndex)
  if (!cat) throw new Error(`no lore category ${categoryIndex}`)
  const firstCol = cat.collections[0]
  if (!firstCol) throw new Error("category has no collections")
  const collections = ll[categoryIndex]
  if (!collections) throw new Error("sparse build missing category")
  const books = collections[firstCol.collectionIndex]
  if (!books) throw new Error("sparse build missing collection")
  collections[firstCol.collectionIndex] = books.slice(1)
  return ll
}

describe("isLoreLibraryItemComplete (sparse wire format)", () => {
  it("returns true when every book in the category is known (sparse)", () => {
    const completion: CharacterCompletion = { loreLibrary: sparseComplete(CATEGORY) }
    expect(isLoreLibraryItemComplete(completion, [CATEGORY])).toBe(true)
  })

  it("returns false when one book in the category is missing (sparse)", () => {
    const completion: CharacterCompletion = { loreLibrary: sparseMissingOne(CATEGORY) }
    expect(isLoreLibraryItemComplete(completion, [CATEGORY])).toBe(false)
  })

  it("returns false for null completion or absent loreLibrary", () => {
    expect(isLoreLibraryItemComplete(null, [CATEGORY])).toBe(false)
    expect(isLoreLibraryItemComplete({}, [CATEGORY])).toBe(false)
  })

  it("returns false for an empty item path", () => {
    const completion: CharacterCompletion = { loreLibrary: sparseComplete(CATEGORY) }
    expect(isLoreLibraryItemComplete(completion, [])).toBe(false)
  })

  it("still handles the rich format (every book known → complete)", () => {
    const cat = loreLibraryData.find((c) => c.categoryIndex === CATEGORY)
    if (!cat) throw new Error("missing category")
    const collections: LoreCategory["collections"] = {}
    for (const col of cat.collections) {
      const books: LoreCategory["collections"][number]["books"] = {}
      for (const b of col.books) books[b.bookIndex] = { name: b.name, known: true }
      collections[col.collectionIndex] = { name: col.name, books }
    }
    const completion: CharacterCompletion = {
      loreLibrary: { [CATEGORY]: { name: cat.name, collections } },
    }
    expect(isLoreLibraryItemComplete(completion, [CATEGORY])).toBe(true)
  })
})

describe("extractLoreKnownSet", () => {
  it("extracts cat:col:book keys from the sparse array format", () => {
    const known = extractLoreKnownSet({ 1: { 2: [3, 4] } })
    expect(known.has("1:2:3")).toBe(true)
    expect(known.has("1:2:4")).toBe(true)
    expect(known.has("1:2:5")).toBe(false)
  })
})
