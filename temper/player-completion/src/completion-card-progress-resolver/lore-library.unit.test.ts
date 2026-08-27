import { describe, expect, it } from "bun:test"
import type { CharacterCompletion } from "@temper/game-completion/completion-types"
import { loreLibraryData } from "@temper/game-completion/generated/lore-library-data.generated"
import { resolveTaskProgress } from "../completion-card-progress-resolver"

const TOTAL_COLLECTIONS = loreLibraryData.reduce((sum, cat) => sum + cat.collections.length, 0)
const LORE_CAT = loreLibraryData[0]
if (LORE_CAT === undefined) throw new Error("test fixture: loreLibraryData[0] missing")
const LORE_COL = LORE_CAT.collections[0]
if (LORE_COL === undefined)
  throw new Error("test fixture: loreLibraryData[0].collections[0] missing")
const LORE_BOOK = LORE_COL.books[0]
if (LORE_BOOK === undefined)
  throw new Error("test fixture: loreLibraryData[0].collections[0].books[0] missing")
const CAT_COLLECTION_COUNT = LORE_CAT.collections.length
const LORE_COL_ALL_BOOKS: number[] = LORE_COL.books.map((b) => b.bookIndex)

describe("resolveTaskProgress / lore-library-character", () => {
  it("reports { 0, totalCollections } when charCompletion has no loreLibrary", () => {
    expect(resolveTaskProgress("lore-library-character", null, {}, null)).toEqual({
      current: 0,
      total: TOTAL_COLLECTIONS,
    })
  })

  it("reports { 0, totalCollections } when charCompletion is null", () => {
    expect(resolveTaskProgress("lore-library-character", null, null, null)).toEqual({
      current: 0,
      total: TOTAL_COLLECTIONS,
    })
  })

  it("counts zero complete collections against the full collection total when empty", () => {
    const charCompletion: CharacterCompletion = { loreLibrary: {} }
    const out = resolveTaskProgress("lore-library-character", null, charCompletion, null)
    expect(out).toEqual({ current: 0, total: TOTAL_COLLECTIONS })
  })

  it("a fully-known collection counts as one complete collection (sparse format)", () => {
    const charCompletion: CharacterCompletion = {
      loreLibrary: {
        [LORE_CAT.categoryIndex]: { [LORE_COL.collectionIndex]: LORE_COL_ALL_BOOKS },
      },
    }
    const out = resolveTaskProgress("lore-library-character", null, charCompletion, null)
    expect(out).toEqual({ current: 1, total: TOTAL_COLLECTIONS })
  })

  it("a partially-known collection does NOT count (sparse format)", () => {
    const charCompletion: CharacterCompletion = {
      loreLibrary: {
        [LORE_CAT.categoryIndex]: { [LORE_COL.collectionIndex]: [LORE_BOOK.bookIndex] },
      },
    }
    const out = resolveTaskProgress("lore-library-character", null, charCompletion, null)
    expect(out).toEqual({ current: LORE_COL.books.length === 1 ? 1 : 0, total: TOTAL_COLLECTIONS })
  })

  it("a fully-known collection counts as one complete collection (rich format)", () => {
    const charCompletion: CharacterCompletion = {
      loreLibrary: {
        [LORE_CAT.categoryIndex]: {
          name: LORE_CAT.name,
          collections: {
            [LORE_COL.collectionIndex]: {
              name: LORE_COL.name,
              books: Object.fromEntries(
                LORE_COL.books.map((b) => [b.bookIndex, { name: b.name, known: true }])
              ),
            },
          },
        },
      },
    }
    const out = resolveTaskProgress("lore-library-character", null, charCompletion, null)
    expect(out).toEqual({ current: 1, total: TOTAL_COLLECTIONS })
  })

  it("narrows to a category, counting complete collections out of the category's collections", () => {
    const charCompletion: CharacterCompletion = {
      loreLibrary: {
        [LORE_CAT.categoryIndex]: { [LORE_COL.collectionIndex]: LORE_COL_ALL_BOOKS },
      },
    }
    const out = resolveTaskProgress(
      "lore-library-character",
      [LORE_CAT.categoryIndex],
      charCompletion,
      null
    )
    expect(out).toEqual({ current: 1, total: CAT_COLLECTION_COUNT })
  })

  it("a collection leaf reports binary completeness { 1, 1 } when fully known", () => {
    const charCompletion: CharacterCompletion = {
      loreLibrary: {
        [LORE_CAT.categoryIndex]: { [LORE_COL.collectionIndex]: LORE_COL_ALL_BOOKS },
      },
    }
    const out = resolveTaskProgress(
      "lore-library-character",
      [LORE_CAT.categoryIndex, LORE_COL.collectionIndex],
      charCompletion,
      null
    )
    expect(out).toEqual({ current: 1, total: 1 })
  })

  it("a non-existent category resolves as a single unrecognized leaf ({ 0, 1 })", () => {
    const charCompletion: CharacterCompletion = { loreLibrary: {} }
    expect(resolveTaskProgress("lore-library-character", [9999], charCompletion, null)).toEqual({
      current: 0,
      total: 1,
    })
  })

  it("a non-existent collection resolves as a single unrecognized leaf ({ 0, 1 })", () => {
    const charCompletion: CharacterCompletion = { loreLibrary: {} }
    expect(
      resolveTaskProgress(
        "lore-library-character",
        [LORE_CAT.categoryIndex, 9999],
        charCompletion,
        null
      )
    ).toEqual({ current: 0, total: 1 })
  })
})
