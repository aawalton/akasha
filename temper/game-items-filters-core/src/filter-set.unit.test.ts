import { describe, expect, it } from "bun:test"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import { buildFilterIndex } from "./filter-registry"
import type { ActiveFilterValues } from "./filter-set"
import { itemPassesFilters } from "./filter-set"
import type { FilterValue } from "./filter-types"

const INDEX = buildFilterIndex()

function facts(overrides: Partial<ItemFacts>): ItemFacts {
  return { itemId: 1, itemName: "Test Item", itemLink: "|H1:item:1|h|h", ...overrides }
}

function active(entries: readonly (readonly [string, FilterValue])[]): ActiveFilterValues {
  return new Map(entries)
}

describe("itemPassesFilters", () => {
  it("passes everything when the active set is empty", () => {
    expect(itemPassesFilters(INDEX, new Map(), facts({ quality: 0 }))).toBe(true)
  })

  it("AND-combines multiple active filters", () => {
    const a = active([
      ["quality", ["5"]],
      ["stolen", "exclude"],
    ])
    expect(itemPassesFilters(INDEX, a, facts({ quality: 5, isStolen: false }))).toBe(true)
    expect(itemPassesFilters(INDEX, a, facts({ quality: 2, isStolen: false }))).toBe(false)
    expect(itemPassesFilters(INDEX, a, facts({ quality: 5, isStolen: true }))).toBe(false)
  })

  it("ignores an active id with no registered filter", () => {
    const a = active([["no-such-filter", "include"]])
    expect(itemPassesFilters(INDEX, a, facts({ quality: 1 }))).toBe(true)
  })

  it("fails closed when a single active filter rejects", () => {
    const a = active([["quality", ["5"]]])
    expect(itemPassesFilters(INDEX, a, facts({ quality: undefined }))).toBe(false)
  })

  it("bop-tradeable include/exclude mirror the isBoPTradeable signal", () => {
    const include = active([["bop-tradeable", "include"]])
    const exclude = active([["bop-tradeable", "exclude"]])
    expect(itemPassesFilters(INDEX, include, facts({ isBoPTradeable: true }))).toBe(true)
    expect(itemPassesFilters(INDEX, include, facts({ isBoPTradeable: false }))).toBe(false)
    expect(itemPassesFilters(INDEX, exclude, facts({ isBoPTradeable: false }))).toBe(true)
    expect(itemPassesFilters(INDEX, exclude, facts({ isBoPTradeable: true }))).toBe(false)
    expect(itemPassesFilters(INDEX, include, facts({ isBoPTradeable: undefined }))).toBe(false)
    expect(itemPassesFilters(INDEX, exclude, facts({ isBoPTradeable: undefined }))).toBe(false)
  })
})
