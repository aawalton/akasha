import { describe, expect, test } from "bun:test"
import type { CharacterCompletion } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import { holdLoreLibraryFromCheckout } from "akasha/temper/player/completion/modules/held-lore-library/held-lore-library.module.test-fixtures.ts"
import {
  extractLoreKnownSet,
  isLoreLibraryItemComplete,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-lore-library-progress/completion-lore-library-progress.module.code.ts"
import {
  sparseComplete,
  sparseMissingOne,
} from "akasha/temper/player/completion/temper-player-completion/test-fixtures/lore-library-sparse-test-utils/lore-library-sparse-test-utils.test-fixture.code.ts"

const LORE = holdLoreLibraryFromCheckout()

const CATEGORY = 1

describe("isLoreLibraryItemComplete over the sparse wire format", () => {
  test("returns true when every book in the category is known", () => {
    const completion: CharacterCompletion = { loreLibrary: sparseComplete(CATEGORY) }
    expect(isLoreLibraryItemComplete(LORE, completion, [CATEGORY])).toBe(true)
  })

  test("returns false when one book in the category is missing", () => {
    const completion: CharacterCompletion = { loreLibrary: sparseMissingOne(CATEGORY) }
    expect(isLoreLibraryItemComplete(LORE, completion, [CATEGORY])).toBe(false)
  })

  test("returns false for null completion or absent loreLibrary", () => {
    expect(isLoreLibraryItemComplete(LORE, null, [CATEGORY])).toBe(false)
    expect(isLoreLibraryItemComplete(LORE, {}, [CATEGORY])).toBe(false)
  })

  test("returns false for an empty item path", () => {
    const completion: CharacterCompletion = { loreLibrary: sparseComplete(CATEGORY) }
    expect(isLoreLibraryItemComplete(LORE, completion, [])).toBe(false)
  })
})

describe("extractLoreKnownSet", () => {
  test("extracts category-collection-book keys from the sparse array format", () => {
    const known = extractLoreKnownSet({ 1: { 2: [3, 4] } })
    expect(known.has("1:2:3")).toBe(true)
    expect(known.has("1:2:4")).toBe(true)
    expect(known.has("1:2:5")).toBe(false)
  })
})
