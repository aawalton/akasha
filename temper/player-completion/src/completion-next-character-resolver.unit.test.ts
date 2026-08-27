import { describe, expect, it } from "bun:test"
import type { CharacterCompletion } from "@temper/game-completion/completion-types"
import { loreLibraryData } from "@temper/game-completion/generated/lore-library-data.generated"
import { type NextCharacterInput, resolveNextCharacter } from "./completion-next-character-resolver"

const CARD = "lore-library-character"
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

function mkChar(
  id: string,
  sortOrder: number,
  loreLibrary: CharacterCompletion["loreLibrary"]
): NextCharacterInput {
  return { id, name: id, sortOrder, completion: { loreLibrary } }
}

describe("resolveNextCharacter — lore-library with sparse data (Shalidor's Library)", () => {
  it("skips a sortOrder-1 character that is complete and returns the next incomplete one", () => {
    const erin = mkChar("erin", 1, sparseComplete(CATEGORY))
    const maviola = mkChar("maviola", 2, sparseMissingOne(CATEGORY))
    const result = resolveNextCharacter([erin, maviola], CARD, [CATEGORY])
    expect(result?.characterId).toBe("maviola")
  })

  it("returns null when every character is complete for the category", () => {
    const a = mkChar("a", 1, sparseComplete(CATEGORY))
    const b = mkChar("b", 2, sparseComplete(CATEGORY))
    expect(resolveNextCharacter([a, b], CARD, [CATEGORY])).toBeNull()
  })
})
