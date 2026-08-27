import { describe, expect, it } from "bun:test"
import { listingEntrySchema } from "./listing-entry-schema"
import type { ListingEntry } from "./listing-types"

const KNOWN_GOOD: ListingEntry = {
  itemLink: "|H1:item:12345:...|h|h",
  itemName: "Rockgrove Helm",
  stackCount: 1,
  price: 5000,
  pricePerUnit: 5000,
  sellerName: "@alanwalton",
  timeRemaining: 2_591_000,
  quality: 4,
  capturedAt: 1_700_000_000,
}

describe("listingEntrySchema", () => {
  it("parses a well-formed ListingEntry", () => {
    const out = listingEntrySchema.parse(KNOWN_GOOD)
    expect(out.itemName).toBe("Rockgrove Helm")
    expect(out.pricePerUnit).toBe(5000)
  })

  it("rejects an unknown key (.strict() drift boundary)", () => {
    expect(() => listingEntrySchema.parse({ ...KNOWN_GOOD, newlyCapturedField: 1 })).toThrow()
  })

  it("rejects a missing required field", () => {
    const { capturedAt: _omitted, ...partial } = KNOWN_GOOD
    expect(() => listingEntrySchema.parse(partial)).toThrow()
  })

  it("rejects a type-wrong field", () => {
    expect(() => listingEntrySchema.parse({ ...KNOWN_GOOD, price: "5000" })).toThrow()
  })
})
