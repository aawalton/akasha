import { describe, expect, it } from "bun:test"
import type { CharacterCompletion } from "@temper/game-completion/completion-types"
import { recipeData } from "@temper/game-completion/generated/recipe-data.generated"
import { z } from "zod"
import { CHARACTER_CRAFTING_CHECKERS } from "./character-crafting-checkers"

const checker = CHARACTER_CRAFTING_CHECKERS.recipes

const STORED_COMPLETION_SCHEMA: z.ZodType<CharacterCompletion> = z.custom<CharacterCompletion>(
  () => true
)

function completionOf(recipes: unknown): CharacterCompletion {
  return STORED_COMPLETION_SCHEMA.parse({ recipes })
}

const STORED_RECORD_SHAPE = {
  "1": { "1": 28358, "2": 33801, "3": 57114, "4": 57135, "5": 57136 },
  "2": { "1": 28293, "2": 28378, "3": 28390, "4": 43154, "5": 57125 },
}

const ARRAY_SHAPE = {
  "1": [28358, 33801, 57114, 57135, 57136],
  "2": [28293, 28378, 28390, 43154, 57125],
}

const EXHAUSTIVE_SHAPE = {
  "1": {
    name: "Meat Dishes",
    recipes: { "28358": { name: "a", known: true }, "33801": { name: "b", known: false } },
  },
}

function allKnown(): {
  record: Record<string, Record<string, number>>
  array: Record<string, number[]>
} {
  const record: Record<string, Record<string, number>> = {}
  const array: Record<string, number[]> = {}
  for (const list of recipeData) {
    const inner: Record<string, number> = {}
    list.recipes.forEach((r, i) => {
      inner[String(i + 1)] = r.itemId
    })
    record[String(list.listIndex)] = inner
    array[String(list.listIndex)] = list.recipes.map((r) => r.itemId)
  }
  return { record, array }
}

describe("CHARACTER_CRAFTING_CHECKERS.recipes — isItemComplete", () => {
  it("finds a known itemId in the stored record shape", () => {
    expect(checker?.isItemComplete?.(completionOf(STORED_RECORD_SHAPE), ["1", 28358])).toBe(true)
    expect(checker?.isItemComplete?.(completionOf(STORED_RECORD_SHAPE), ["2", 43154])).toBe(true)
  })

  it("rejects an unknown itemId in the stored record shape", () => {
    expect(checker?.isItemComplete?.(completionOf(STORED_RECORD_SHAPE), ["1", 999999])).toBe(false)
  })

  it("does not confuse a record key with an itemId", () => {
    expect(checker?.isItemComplete?.(completionOf(STORED_RECORD_SHAPE), ["1", 1])).toBe(false)
  })

  it("still handles the array shape", () => {
    expect(checker?.isItemComplete?.(completionOf(ARRAY_SHAPE), ["1", 28358])).toBe(true)
    expect(checker?.isItemComplete?.(completionOf(ARRAY_SHAPE), ["1", 999999])).toBe(false)
  })

  it("still handles the legacy exhaustive RecipeList shape", () => {
    expect(checker?.isItemComplete?.(completionOf(EXHAUSTIVE_SHAPE), ["1", 28358])).toBe(true)
    expect(checker?.isItemComplete?.(completionOf(EXHAUSTIVE_SHAPE), ["1", 33801])).toBe(false)
    expect(checker?.isItemComplete?.(completionOf(EXHAUSTIVE_SHAPE), ["1"])).toBe(false)
  })

  it("declines a whole-list query against a sparse shape", () => {
    expect(checker?.isItemComplete?.(completionOf(STORED_RECORD_SHAPE), ["1"])).toBe(false)
    expect(checker?.isItemComplete?.(completionOf(ARRAY_SHAPE), ["1"])).toBe(false)
  })

  it("returns false for missing / empty completion", () => {
    expect(checker?.isItemComplete?.(null, ["1", 28358])).toBe(false)
    expect(checker?.isItemComplete?.(completionOf(undefined), ["1", 28358])).toBe(false)
    expect(checker?.isItemComplete?.(completionOf({ "1": {} }), ["1", 28358])).toBe(false)
    expect(checker?.isItemComplete?.(completionOf(STORED_RECORD_SHAPE), [])).toBe(false)
  })
})

describe("CHARACTER_CRAFTING_CHECKERS.recipes — isCardComplete", () => {
  it("counts known recipes out of the stored record shape", () => {
    const { record } = allKnown()
    expect(checker?.isCardComplete(completionOf(record))).toBe(true)
  })

  it("still counts the array shape", () => {
    const { array } = allKnown()
    expect(checker?.isCardComplete(completionOf(array))).toBe(true)
  })

  it("is false for a partially-known character", () => {
    expect(checker?.isCardComplete(completionOf(STORED_RECORD_SHAPE))).toBe(false)
    expect(checker?.isCardComplete(completionOf(ARRAY_SHAPE))).toBe(false)
  })

  it("is false for missing / empty completion", () => {
    expect(checker?.isCardComplete(null)).toBe(false)
    expect(checker?.isCardComplete(completionOf(undefined))).toBe(false)
    expect(checker?.isCardComplete(completionOf({}))).toBe(false)
  })
})
