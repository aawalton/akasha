import { describe, expect, it } from "bun:test"
import {
  ESO_ITEMTYPE_RECIPE,
  type InventoryItemData,
} from "@temper/game-items-core/inventory-types"
import { itemPassesConditions } from "./generated/inventory-rule-conditions.generated"
import { makeContext, makeItem } from "./inventory-rule-test-utils"
import type { CategoryRule } from "./inventory-rule-types"

type Conditions = CategoryRule["conditions"]

const RECIPE_SCROLL_ID = 99001
const RECIPE_RESULT_ID = 28289

function makeRecipeItem(overrides: Partial<InventoryItemData> = {}): InventoryItemData {
  return makeItem({
    itemId: RECIPE_SCROLL_ID,
    itemName: "Recipe: Roast Venison",
    itemType: ESO_ITEMTYPE_RECIPE,
    ...overrides,
  })
}

describe("itemPassesConditions — known (collectible fallback)", () => {
  it("passes when known=undefined (non-recipe item) regardless of condition", () => {
    const item = makeItem()
    expect(itemPassesConditions(item, { known: "known" })).toBe(true)
    expect(itemPassesConditions(item, { known: "not-known" })).toBe(true)
  })

  it("passes known='known' when item.known is true", () => {
    const item = makeItem({ known: true })
    expect(itemPassesConditions(item, { known: "known" })).toBe(true)
  })

  it("fails known='known' when item.known is false", () => {
    const item = makeItem({ known: false })
    expect(itemPassesConditions(item, { known: "known" })).toBe(false)
  })

  it("passes known='not-known' when item.known is false", () => {
    const item = makeItem({ known: false })
    expect(itemPassesConditions(item, { known: "not-known" })).toBe(true)
  })

  it("fails known='not-known' when item.known is true", () => {
    const item = makeItem({ known: true })
    expect(itemPassesConditions(item, { known: "not-known" })).toBe(false)
  })
})

describe("itemPassesConditions — canUnlock (collectible fallback)", () => {
  it("passes when known=undefined (non-recipe item) regardless of canUnlock condition", () => {
    const item = makeItem()
    expect(itemPassesConditions(item, { canUnlock: "can-unlock" })).toBe(true)
    expect(itemPassesConditions(item, { canUnlock: "cannot-unlock" })).toBe(true)
  })

  it("passes canUnlock='can-unlock' when item.known is false (not yet learned)", () => {
    const item = makeItem({ known: false })
    expect(itemPassesConditions(item, { canUnlock: "can-unlock" })).toBe(true)
  })

  it("fails canUnlock='can-unlock' when item.known is true (already learned)", () => {
    const item = makeItem({ known: true })
    expect(itemPassesConditions(item, { canUnlock: "can-unlock" })).toBe(false)
  })

  it("passes canUnlock='cannot-unlock' when item.known is true", () => {
    const item = makeItem({ known: true })
    expect(itemPassesConditions(item, { canUnlock: "cannot-unlock" })).toBe(true)
  })

  it("fails canUnlock='cannot-unlock' when item.known is false", () => {
    const item = makeItem({ known: false })
    expect(itemPassesConditions(item, { canUnlock: "cannot-unlock" })).toBe(false)
  })
})

describe("itemPassesConditions — known + canUnlock combined (collectible fallback)", () => {
  it("evaluates both conditions when present", () => {
    const conditions: Conditions = { known: "not-known", canUnlock: "can-unlock" }

    expect(itemPassesConditions(makeItem({ known: false }), conditions)).toBe(true)

    expect(itemPassesConditions(makeItem({ known: true }), conditions)).toBe(false)
  })

  it("no conditions at all passes through", () => {
    expect(itemPassesConditions(makeItem({ known: true }), undefined)).toBe(true)
    expect(itemPassesConditions(makeItem({ known: false }), undefined)).toBe(true)
    expect(itemPassesConditions(makeItem(), undefined)).toBe(true)
  })
})

describe("itemPassesConditions — canUnlock for recipes (context-aware)", () => {
  it("fails canUnlock='can-unlock' when ALL characters know the recipe", () => {
    const item = makeRecipeItem()
    const ctx = makeContext({ "1001": [RECIPE_RESULT_ID], "1002": [RECIPE_RESULT_ID] })
    expect(itemPassesConditions(item, { canUnlock: "can-unlock" }, ctx)).toBe(false)
  })

  it("passes canUnlock='can-unlock' when at least one character doesn't know the recipe", () => {
    const item = makeRecipeItem()
    const ctx = makeContext({ "1001": [RECIPE_RESULT_ID], "1002": [] })
    expect(itemPassesConditions(item, { canUnlock: "can-unlock" }, ctx)).toBe(true)
  })

  it("passes canUnlock='can-unlock' when no characters know the recipe", () => {
    const item = makeRecipeItem()
    const ctx = makeContext({ "1001": [], "1002": [] })
    expect(itemPassesConditions(item, { canUnlock: "can-unlock" }, ctx)).toBe(true)
  })

  it("passes canUnlock='cannot-unlock' when ALL characters know the recipe", () => {
    const item = makeRecipeItem()
    const ctx = makeContext({ "1001": [RECIPE_RESULT_ID], "1002": [RECIPE_RESULT_ID] })
    expect(itemPassesConditions(item, { canUnlock: "cannot-unlock" }, ctx)).toBe(true)
  })

  it("fails canUnlock='cannot-unlock' when any character doesn't know the recipe", () => {
    const item = makeRecipeItem()
    const ctx = makeContext({ "1001": [RECIPE_RESULT_ID], "1002": [] })
    expect(itemPassesConditions(item, { canUnlock: "cannot-unlock" }, ctx)).toBe(false)
  })
})

describe("itemPassesConditions — known for recipes (context-aware)", () => {
  it("passes known='known' when ALL characters know the recipe", () => {
    const item = makeRecipeItem()
    const ctx = makeContext({ "1001": [RECIPE_RESULT_ID], "1002": [RECIPE_RESULT_ID] })
    expect(itemPassesConditions(item, { known: "known" }, ctx)).toBe(true)
  })

  it("fails known='known' when not all characters know the recipe", () => {
    const item = makeRecipeItem()
    const ctx = makeContext({ "1001": [RECIPE_RESULT_ID], "1002": [] })
    expect(itemPassesConditions(item, { known: "known" }, ctx)).toBe(false)
  })

  it("passes known='not-known' when not all characters know the recipe", () => {
    const item = makeRecipeItem()
    const ctx = makeContext({ "1001": [RECIPE_RESULT_ID], "1002": [] })
    expect(itemPassesConditions(item, { known: "not-known" }, ctx)).toBe(true)
  })

  it("fails known='not-known' when ALL characters know the recipe", () => {
    const item = makeRecipeItem()
    const ctx = makeContext({ "1001": [RECIPE_RESULT_ID], "1002": [RECIPE_RESULT_ID] })
    expect(itemPassesConditions(item, { known: "not-known" }, ctx)).toBe(false)
  })
})

describe("itemPassesConditions — recipe without context falls back to item.known", () => {
  it("uses item.known for recipes when no context provided", () => {
    const unknownRecipe = makeRecipeItem({ known: false })
    const knownRecipe = makeRecipeItem({ known: true })
    expect(itemPassesConditions(unknownRecipe, { canUnlock: "can-unlock" })).toBe(true)
    expect(itemPassesConditions(knownRecipe, { canUnlock: "can-unlock" })).toBe(false)
  })

  it("uses item.known for recipes when context has empty knowledge map", () => {
    const unknownRecipe = makeRecipeItem({ known: false })
    const ctx = makeContext({})
    expect(itemPassesConditions(unknownRecipe, { canUnlock: "can-unlock" }, ctx)).toBe(true)
  })
})
