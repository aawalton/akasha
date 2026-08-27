import { describe, expect, it } from "bun:test"
import type { ExcludedLocation } from "@temper/game-items-core/inventory-guild-bank-filter"
import { describeExclusions, describeInventoryScope } from "./inventory-scope-note-text"

function guildBank(displayName: string, value: number): ExcludedLocation {
  return { key: displayName, displayName, value, reason: "unmanaged-guild-bank" }
}

function unidentified(key: string, value: number): ExcludedLocation {
  return { key, displayName: key, value, reason: "unclassifiable-location" }
}

describe("describeExclusions", () => {
  it("returns undefined when nothing was left out", () => {
    expect(describeExclusions([])).toBeUndefined()
  })

  it("names a single guild bank and its value", () => {
    expect(describeExclusions([guildBank("Walton Mountain", 45_689_020)])).toBe(
      "Excludes 1 guild bank (Walton Mountain) — 45,689,020g."
    )
  })

  it("names every excluded guild bank so the total can be reconciled", () => {
    expect(describeExclusions([guildBank("Alpha", 10), guildBank("Beta", 5)])).toBe(
      "Excludes 2 guild banks (Alpha, Beta) — 15g."
    )
  })

  it("counts an unidentified location apart from guild banks", () => {
    const text = describeExclusions([guildBank("Alpha", 100), unidentified("", 7)])

    expect(text).toBe("Excludes 1 guild bank (Alpha) and 1 unidentified location — 107g.")
    expect(text).not.toContain("2 guild banks")
  })

  it("reports unidentified locations alone without mentioning guild banks", () => {
    expect(describeExclusions([unidentified("", 7), unidentified("char-1", 3)])).toBe(
      "Excludes 2 unidentified locations — 10g."
    )
  })

  it("rounds the excluded total", () => {
    expect(describeExclusions([guildBank("Alpha", 10.6)])).toContain("11g")
  })
})

describe("describeInventoryScope", () => {
  it("states items-only scope when currencies are not folded in", () => {
    expect(describeInventoryScope({ excluded: [], includesCurrencies: false })).toBe("Items only.")
  })

  it("states that currencies are included when they are", () => {
    expect(describeInventoryScope({ excluded: [], includesCurrencies: true })).toBe(
      "Items and currencies."
    )
  })

  it("discloses that an active filter has narrowed the total", () => {
    expect(describeInventoryScope({ excluded: [], includesCurrencies: true, filtered: true })).toBe(
      "Items and currencies, matching the active filters."
    )
  })

  it("combines scope and exclusions in one sentence pair", () => {
    expect(
      describeInventoryScope({
        excluded: [guildBank("Walton Mountain", 45_689_020)],
        includesCurrencies: false,
      })
    ).toBe("Items only. Excludes 1 guild bank (Walton Mountain) — 45,689,020g.")
  })

  it("never renders a bare total with no scope stated", () => {
    for (const includesCurrencies of [true, false]) {
      for (const filtered of [true, false]) {
        for (const excluded of [[], [guildBank("Alpha", 1)]]) {
          const text = describeInventoryScope({ excluded, includesCurrencies, filtered })
          expect(text.length).toBeGreaterThan(0)
          expect(text).toMatch(/^Items (only|and currencies)/)
        }
      }
    }
  })
})
