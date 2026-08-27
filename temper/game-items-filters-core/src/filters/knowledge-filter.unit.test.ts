import { describe, expect, it } from "bun:test"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import { knowledgeFilter } from "./knowledge-filter"

const baseFacts = { itemId: 1, itemName: "Test Item", itemLink: "|H0:item:1:|h|h" } as const

const known: ItemFacts = { ...baseFacts, isKnowledgeItem: true, known: true }
const learnable: ItemFacts = { ...baseFacts, isKnowledgeItem: true, known: false }
const nonKnowledge: ItemFacts = { ...baseFacts, isKnowledgeItem: false, known: false }
const undefinedBits: ItemFacts = { ...baseFacts }

describe("knowledgeFilter", () => {
  it("include (KNOWN) matches a known item", () => {
    expect(knowledgeFilter.matches(known, "include")).toBe(true)
  })

  it("exclude (UNKNOWN / learnable) matches a learnable-unknown item", () => {
    expect(knowledgeFilter.matches(learnable, "exclude")).toBe(true)
  })

  it("a non-knowledge item matches NEITHER toggle", () => {
    expect(knowledgeFilter.matches(nonKnowledge, "include")).toBe(false)
    expect(knowledgeFilter.matches(nonKnowledge, "exclude")).toBe(false)
  })

  it("a learnable-unknown item does not match include", () => {
    expect(knowledgeFilter.matches(learnable, "include")).toBe(false)
  })

  it("a known item does not match exclude", () => {
    expect(knowledgeFilter.matches(known, "exclude")).toBe(false)
  })

  it("fails closed when the knowledge bits are undefined (neither toggle matches)", () => {
    expect(knowledgeFilter.matches(undefinedBits, "include")).toBe(false)
    expect(knowledgeFilter.matches(undefinedBits, "exclude")).toBe(false)
  })

  it("fails closed for exclude when only isKnowledgeItem is undefined", () => {
    const partial: ItemFacts = { ...baseFacts, known: false }
    expect(knowledgeFilter.matches(partial, "exclude")).toBe(false)
  })

  it("deserialize round-trips include / exclude and rejects garbage", () => {
    expect(knowledgeFilter.deserialize(knowledgeFilter.serialize("include"))).toBe("include")
    expect(knowledgeFilter.deserialize(knowledgeFilter.serialize("exclude"))).toBe("exclude")
    expect(knowledgeFilter.deserialize("nonsense")).toBeUndefined()
    expect(knowledgeFilter.deserialize(42)).toBeUndefined()
  })
})
