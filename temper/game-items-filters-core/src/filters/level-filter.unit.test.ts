import { describe, expect, it } from "bun:test"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import { createSearchRequestCollector } from "../filter-types"
import { levelFilter } from "./level-filter"

const baseFacts = { itemId: 1, itemName: "Test Item", itemLink: "|H0:item:1:|h|h" } as const

const lvl30: ItemFacts = { ...baseFacts, requiredLevel: 30, requiredCP: 0 }
const lvl50: ItemFacts = { ...baseFacts, requiredLevel: 50, requiredCP: 0 }

describe("levelFilter", () => {
  it("matches at-or-below the bound by default (<=)", () => {
    expect(levelFilter.matches(lvl30, { value: 40 })).toBe(true)
    expect(levelFilter.matches(lvl50, { value: 40 })).toBe(false)
  })

  it("respects an explicit >= operator", () => {
    expect(levelFilter.matches(lvl50, { value: 40, op: ">=" })).toBe(true)
    expect(levelFilter.matches(lvl30, { value: 40, op: ">=" })).toBe(false)
  })

  it("deserialize round-trips a range value", () => {
    expect(levelFilter.deserialize(levelFilter.serialize({ value: 40, op: ">=" }))).toEqual({
      value: 40,
      op: ">=",
    })
    expect(levelFilter.deserialize("nonsense")).toBeUndefined()
    expect(levelFilter.deserialize({ value: "x" })).toBeUndefined()
  })

  describe("applyToSearch", () => {
    it("maps the default <= threshold to [0, value]", () => {
      const req = createSearchRequestCollector()
      levelFilter.applyToSearch?.(req, { value: 40 })
      expect(req.ranges.get("level")).toEqual([0, 40])
    })

    it("maps an explicit <= threshold to [0, value]", () => {
      const req = createSearchRequestCollector()
      levelFilter.applyToSearch?.(req, { value: 50, op: "<=" })
      expect(req.ranges.get("level")).toEqual([0, 50])
    })

    it("maps < to [0, value - 1]", () => {
      const req = createSearchRequestCollector()
      levelFilter.applyToSearch?.(req, { value: 50, op: "<" })
      expect(req.ranges.get("level")).toEqual([0, 49])
    })

    it("maps >= to [value, BIG]", () => {
      const req = createSearchRequestCollector()
      levelFilter.applyToSearch?.(req, { value: 10, op: ">=" })
      const band = req.ranges.get("level")
      expect(band?.[0]).toBe(10)
      expect(band?.[1]).toBeGreaterThanOrEqual(999999)
    })

    it("maps > to [value + 1, BIG]", () => {
      const req = createSearchRequestCollector()
      levelFilter.applyToSearch?.(req, { value: 10, op: ">" })
      const band = req.ranges.get("level")
      expect(band?.[0]).toBe(11)
      expect(band?.[1]).toBeGreaterThanOrEqual(999999)
    })

    it("maps = to a singleton band [value, value]", () => {
      const req = createSearchRequestCollector()
      levelFilter.applyToSearch?.(req, { value: 50, op: "=" })
      expect(req.ranges.get("level")).toEqual([50, 50])
    })

    it("contributes nothing for != (not a contiguous band)", () => {
      const req = createSearchRequestCollector()
      levelFilter.applyToSearch?.(req, { value: 50, op: "!=" })
      expect(req.ranges.size).toBe(0)
    })
  })
})
