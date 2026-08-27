import { describe, expect, it } from "bun:test"
import { INVENTORY_RULE_FILTERS } from "./filter-registry"

describe("INVENTORY_RULE_FILTERS — id uniqueness", () => {
  it("every filter id is unique", () => {
    const ids = INVENTORY_RULE_FILTERS.map((f) => f.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe("INVENTORY_RULE_FILTERS — order stability", () => {
  it("preserves the canonical id order", () => {
    expect(INVENTORY_RULE_FILTERS.map((f) => f.id)).toEqual([
      "quality",
      "traits",
      "location",
      "set-sources",
      "level",
      "stolen",
      "crafted",
      "bound",
      "bop-tradeable",
      "quest-relevant",
      "locked",
      "reconstructed",
      "transmuted",
      "known",
      "can-inspire",
      "can-research",
      "can-companion-equip",
      "needed-for-target-character-build",
      "needed-for-target-companion-build",
      "can-unlock",
      "required-skill-lines",
      "required-curse-state",
      "can-level-morphs",
      "stack-fullness",
      "can-open",
      "can-sell",
      "can-list-at-guild-trader",
      "can-give-max-rewards",
      "all-stocked",
      "stock-threshold",
      "item-name",
      "value",
      "market-value",
      "merchant-value",
      "replacement-value",
      "keep-quantity",
      "target-quantity",
      "potion-effects",
    ])
  })

  it("contains exactly 38 filters", () => {
    expect(INVENTORY_RULE_FILTERS.length).toBe(38)
  })
})

describe("INVENTORY_RULE_FILTERS — required shape", () => {
  it.each(
    INVENTORY_RULE_FILTERS.map((f) => [f.id, f] as const)
  )("filter %s exposes the InventoryRuleFilter contract", (_id, filter) => {
    expect(typeof filter.id).toBe("string")
    expect(filter.id.length).toBeGreaterThan(0)
    expect(typeof filter.label).toBe("string")
    expect(filter.label.length).toBeGreaterThan(0)
    expect(typeof filter.priority).toBe("number")
    expect(typeof filter.isEligible).toBe("function")
    expect(Array.isArray(filter.mutuallyExclusive)).toBe(true)
    expect(typeof filter.isPresent).toBe("function")
    expect(typeof filter.fingerprint).toBe("function")
    expect(typeof filter.applyDefault).toBe("function")
    expect(typeof filter.clear).toBe("function")
    expect(typeof filter.transferToCategory).toBe("function")
  })
})

describe("INVENTORY_RULE_FILTERS — mutuallyExclusive symmetry", () => {
  it("mutuallyExclusive references are symmetric", () => {
    const byId = new Map(INVENTORY_RULE_FILTERS.map((f) => [f.id, f]))
    for (const filter of INVENTORY_RULE_FILTERS) {
      for (const otherId of filter.mutuallyExclusive) {
        const other = byId.get(otherId)
        expect(other, `${filter.id} references unknown filter ${otherId}`).toBeDefined()
        expect(
          other?.mutuallyExclusive.includes(filter.id),
          `${filter.id} ↔ ${otherId} mutuallyExclusive is not symmetric`
        ).toBe(true)
      }
    }
  })

  it("mutuallyExclusive does not include self", () => {
    for (const filter of INVENTORY_RULE_FILTERS) {
      expect(filter.mutuallyExclusive).not.toContain(filter.id)
    }
  })
})

describe("INVENTORY_RULE_FILTERS — applyDefault / clear round-trip", () => {
  it("every key set by applyDefault is also set by clear", () => {
    for (const filter of INVENTORY_RULE_FILTERS) {
      const def = filter.applyDefault()
      const cleared = filter.clear()
      for (const key of Object.keys(def)) {
        expect(
          key in cleared,
          `${filter.id}: applyDefault sets ${key} but clear does not reset it`
        ).toBe(true)
      }
    }
  })

  it("clear() patch values are all undefined", () => {
    for (const filter of INVENTORY_RULE_FILTERS) {
      const cleared = filter.clear()
      for (const [key, value] of Object.entries(cleared)) {
        expect(
          value,
          `${filter.id}.clear() set ${key}=${String(value)}; expected undefined`
        ).toBeUndefined()
      }
    }
  })
})
