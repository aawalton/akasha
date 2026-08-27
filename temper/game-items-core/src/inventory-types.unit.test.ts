import { describe, expect, it } from "bun:test"
import {
  ESO_ITEMTYPE_CONTAINER,
  ESO_ITEMTYPE_CRAFTED_ABILITY_SCRIPT,
  ESO_ITEMTYPE_RECIPE,
  ESO_SPECIALIZED_ITEMTYPE_MOTIF_BOOK,
  ESO_SPECIALIZED_ITEMTYPE_MOTIF_CHAPTER,
  isKnowledgeItem,
} from "./inventory-types"

describe("isKnowledgeItem", () => {
  it("is true for recipes (by itemType)", () => {
    expect(isKnowledgeItem(ESO_ITEMTYPE_RECIPE, undefined)).toBe(true)
  })

  it("is true for scribing scripts (by itemType)", () => {
    expect(isKnowledgeItem(ESO_ITEMTYPE_CRAFTED_ABILITY_SCRIPT, undefined)).toBe(true)
  })

  it("is true for motif master books and chapters (by specializedItemType)", () => {
    expect(isKnowledgeItem(undefined, ESO_SPECIALIZED_ITEMTYPE_MOTIF_BOOK)).toBe(true)
    expect(isKnowledgeItem(undefined, ESO_SPECIALIZED_ITEMTYPE_MOTIF_CHAPTER)).toBe(true)
  })

  it("is false for a generic container (the runebox repro shape: itemType 18, specialized 850)", () => {
    expect(isKnowledgeItem(ESO_ITEMTYPE_CONTAINER, 850)).toBe(false)
  })

  it("is false for plain gear / unknown types", () => {
    expect(isKnowledgeItem(1, undefined)).toBe(false)
    expect(isKnowledgeItem(undefined, undefined)).toBe(false)
    expect(isKnowledgeItem(0, 0)).toBe(false)
  })
})
