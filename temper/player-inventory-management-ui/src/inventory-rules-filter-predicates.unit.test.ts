import { describe, expect, test } from "bun:test"
import { ALL_CATEGORIES_ID } from "@temper/game-items-rules-core/inventory-rule-types"
import { buildCategoryMatchIds, matchesCategoryFilter } from "./inventory-rules-filter-predicates"

const PARENT = "companion"
const CHILD = "companion-weapons"
const GRANDCHILD = "companion-one-handed"

describe("buildCategoryMatchIds — category filter narrowing", () => {
  test("no selection (empty string) returns null (no category filter)", () => {
    expect(buildCategoryMatchIds("")).toBeNull()
  })

  test("subcategory selection narrows to the node + its descendants ONLY (not the parent)", () => {
    const set = buildCategoryMatchIds(CHILD)
    expect(set).not.toBeNull()
    expect(set?.has(CHILD)).toBe(true)
    expect(set?.has(GRANDCHILD)).toBe(true)
    expect(set?.has(PARENT)).toBe(false)
  })

  test("top-level selection still narrows correctly (node + descendants)", () => {
    const set = buildCategoryMatchIds(PARENT)
    expect(set).not.toBeNull()
    expect(set?.has(PARENT)).toBe(true)
    expect(set?.has(CHILD)).toBe(true)
    expect(set?.has(GRANDCHILD)).toBe(true)
  })

  test("universal selection (ALL_CATEGORIES_ID) matches the universal id and the whole tree", () => {
    const set = buildCategoryMatchIds(ALL_CATEGORIES_ID)
    expect(set).not.toBeNull()
    expect(set?.has(ALL_CATEGORIES_ID)).toBe(true)
    expect(set?.has(PARENT)).toBe(true)
    expect(set?.has(CHILD)).toBe(true)
  })
})

describe("matchesCategoryFilter — which rules a category selection shows", () => {
  test("no category filter (null match set): every rule shows", () => {
    expect(matchesCategoryFilter(PARENT, null)).toBe(true)
    expect(matchesCategoryFilter(CHILD, null)).toBe(true)
    expect(matchesCategoryFilter(ALL_CATEGORIES_ID, null)).toBe(true)
  })

  test("subcategory selection: shows the node + descendants, HIDES the parent-only rule", () => {
    const set = buildCategoryMatchIds(CHILD)
    expect(matchesCategoryFilter(CHILD, set)).toBe(true)
    expect(matchesCategoryFilter(GRANDCHILD, set)).toBe(true)
    expect(matchesCategoryFilter(PARENT, set)).toBe(false)
  })

  test("universal rules always show, even under a narrow subcategory selection", () => {
    const set = buildCategoryMatchIds(CHILD)
    expect(matchesCategoryFilter(ALL_CATEGORIES_ID, set)).toBe(true)
  })

  test("top-level selection still shows its whole subtree", () => {
    const set = buildCategoryMatchIds(PARENT)
    expect(matchesCategoryFilter(PARENT, set)).toBe(true)
    expect(matchesCategoryFilter(CHILD, set)).toBe(true)
    expect(matchesCategoryFilter(GRANDCHILD, set)).toBe(true)
  })
})
