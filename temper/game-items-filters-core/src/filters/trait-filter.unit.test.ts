import { describe, expect, it } from "bun:test"
import { esoTraitToTemperId } from "@temper/game-items-core/eso-trait-reverse-map"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import { createSearchRequestCollector } from "../filter-types"
import { traitFilter } from "./trait-filter"

const baseFacts = { itemId: 1, itemName: "Test Item", itemLink: "|H0:item:1:|h|h" } as const

const powered: ItemFacts = { ...baseFacts, traitType: 1 }
const charged: ItemFacts = { ...baseFacts, traitType: 2 }
const unknown: ItemFacts = { ...baseFacts }

describe("traitFilter", () => {
  it("matches anything when the selection is empty", () => {
    expect(traitFilter.matches(powered, [])).toBe(true)
    expect(traitFilter.matches(unknown, [])).toBe(true)
  })

  it("matches an item whose trait is selected", () => {
    expect(traitFilter.matches(powered, ["powered"])).toBe(true)
  })

  it("rejects an item whose trait is not selected", () => {
    expect(traitFilter.matches(charged, ["powered"])).toBe(false)
  })

  it("fails closed when traitType is undefined", () => {
    expect(traitFilter.matches(unknown, ["powered"])).toBe(false)
  })

  it("deserialize round-trips an array and rejects non-arrays", () => {
    expect(traitFilter.deserialize(traitFilter.serialize(["powered", "charged"]))).toEqual([
      "powered",
      "charged",
    ])
    expect(traitFilter.deserialize("nonsense")).toBeUndefined()
    expect(traitFilter.deserialize(42)).toBeUndefined()
    expect(traitFilter.deserialize([1, 2])).toBeUndefined()
  })

  describe("applyToSearch", () => {
    it("expands a single-family trait id to its one ESO number", () => {
      const req = createSearchRequestCollector()
      traitFilter.applyToSearch?.(req, ["powered"])
      expect(req.terms.get("trait")).toEqual([1])
    })

    it("expands a multi-family trait id to ALL its ESO numbers", () => {
      const req = createSearchRequestCollector()
      traitFilter.applyToSearch?.(req, ["infused"])
      expect([...(req.terms.get("trait") ?? [])].sort((a, b) => a - b)).toEqual([4, 16, 33])
    })

    it("produces ESO numbers that round-trip back to the same trait id", () => {
      const req = createSearchRequestCollector()
      traitFilter.applyToSearch?.(req, ["sturdy"])
      const terms = req.terms.get("trait") ?? []
      expect(terms.length).toBeGreaterThan(0)
      for (const esoNum of terms) {
        expect(esoTraitToTemperId(esoNum)).toBe("sturdy")
      }
    })

    it("unions and dedupes across multiple selected traits", () => {
      const req = createSearchRequestCollector()
      traitFilter.applyToSearch?.(req, ["powered", "charged"])
      expect([...(req.terms.get("trait") ?? [])].sort((a, b) => a - b)).toEqual([1, 2])
    })

    it("contributes nothing for an empty selection", () => {
      const req = createSearchRequestCollector()
      traitFilter.applyToSearch?.(req, [])
      expect(req.terms.size).toBe(0)
    })

    it("ignores an unknown trait id", () => {
      const req = createSearchRequestCollector()
      traitFilter.applyToSearch?.(req, ["not-a-real-trait"])
      expect(req.terms.size).toBe(0)
    })
  })
})
