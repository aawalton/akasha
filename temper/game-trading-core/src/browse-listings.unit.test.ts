import { describe, expect, test } from "bun:test"
import {
  type BrowseListing,
  mergeListings,
  sortByUnitPriceAsc,
  sortByUnitPriceDesc,
} from "./browse-listings"

function listing(
  uid: string,
  pricePerUnit: number,
  overrides: Partial<BrowseListing> = {}
): BrowseListing {
  return {
    uid,
    pricePerUnit,
    totalPrice: overrides.totalPrice ?? pricePerUnit,
    guildId: overrides.guildId ?? 1,
    sellerName: overrides.sellerName ?? "",
    facts: overrides.facts ?? undefined,
  }
}

describe("mergeListings", () => {
  test("accumulates listings keyed by uid", () => {
    const merged = mergeListings([listing("a", 10)], [listing("b", 20)])
    expect(merged.map((l) => l.uid).sort()).toEqual(["a", "b"])
  })

  test("dedupes on uid collision with later page winning", () => {
    const merged = mergeListings(
      [listing("a", 10, { totalPrice: 100 })],
      [listing("a", 5, { totalPrice: 50 })]
    )
    expect(merged).toHaveLength(1)
    expect(merged[0]?.pricePerUnit).toBe(5)
    expect(merged[0]?.totalPrice).toBe(50)
  })

  test("returns a new array and does not mutate existing", () => {
    const existing = [listing("a", 10)]
    const merged = mergeListings(existing, [listing("b", 20)])
    expect(merged).not.toBe(existing)
    expect(existing).toHaveLength(1)
  })

  test("merging into an empty existing yields the incoming set", () => {
    const merged = mergeListings([], [listing("a", 10), listing("b", 20)])
    expect(merged).toHaveLength(2)
  })

  test("incoming dupes within one batch keep the last occurrence", () => {
    const merged = mergeListings([], [listing("a", 10), listing("a", 7), listing("b", 3)])
    expect(merged).toHaveLength(2)
    expect(merged.find((l) => l.uid === "a")?.pricePerUnit).toBe(7)
  })

  test("carries sellerName through merge and sort", () => {
    const merged = mergeListings(
      [],
      [listing("a", 30, { sellerName: "@Alice" }), listing("b", 10, { sellerName: "@Bob" })]
    )
    const sorted = sortByUnitPriceAsc(merged)
    expect(sorted.map((l) => l.sellerName)).toEqual(["@Bob", "@Alice"])
  })
})

describe("sortByUnitPriceAsc", () => {
  test("sorts ascending by pricePerUnit", () => {
    const sorted = sortByUnitPriceAsc([listing("a", 30), listing("b", 10), listing("c", 20)])
    expect(sorted.map((l) => l.uid)).toEqual(["b", "c", "a"])
  })

  test("ties broken by uid for determinism", () => {
    const sorted = sortByUnitPriceAsc([listing("z", 10), listing("a", 10), listing("m", 10)])
    expect(sorted.map((l) => l.uid)).toEqual(["a", "m", "z"])
  })

  test("returns a new array and does not mutate input", () => {
    const input = [listing("a", 30), listing("b", 10)]
    const sorted = sortByUnitPriceAsc(input)
    expect(sorted).not.toBe(input)
    expect(input.map((l) => l.uid)).toEqual(["a", "b"])
  })

  test("handles an empty array", () => {
    expect(sortByUnitPriceAsc([])).toEqual([])
  })
})

describe("sortByUnitPriceDesc", () => {
  test("sorts descending by pricePerUnit", () => {
    const sorted = sortByUnitPriceDesc([listing("a", 30), listing("b", 10), listing("c", 20)])
    expect(sorted.map((l) => l.uid)).toEqual(["a", "c", "b"])
  })

  test("ties broken by uid ascending for determinism", () => {
    const sorted = sortByUnitPriceDesc([listing("z", 10), listing("a", 10), listing("m", 10)])
    expect(sorted.map((l) => l.uid)).toEqual(["a", "m", "z"])
  })

  test("returns a new array and does not mutate input", () => {
    const input = [listing("a", 10), listing("b", 30)]
    const sorted = sortByUnitPriceDesc(input)
    expect(sorted).not.toBe(input)
    expect(input.map((l) => l.uid)).toEqual(["a", "b"])
  })
})
