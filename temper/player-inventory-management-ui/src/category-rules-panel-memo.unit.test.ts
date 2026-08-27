import { describe, expect, it } from "bun:test"
import type { AffectedItem } from "@temper/game-items-rules-core/inventory-rule-matcher-types"

const EMPTY_AFFECTED_ITEMS: AffectedItem[] = []

function makeNullableMap(): Map<string, AffectedItem[]> | null {
  return null
}

describe("CategoryRulesPanel memo stability", () => {
  describe("affectedItems ?? [] breaks memo", () => {
    it("creates a new reference each render when map returns undefined", () => {
      const map = new Map<string, AffectedItem[]>()

      const render1 = map.get("rule-1") ?? []
      const render2 = map.get("rule-1") ?? []

      expect(Object.is(render1, render2)).toBe(false)
    })

    it("creates a new reference each render when map is null", () => {
      const map = makeNullableMap()

      const render1 = map?.get("rule-1") ?? []
      const render2 = map?.get("rule-1") ?? []

      expect(Object.is(render1, render2)).toBe(false)
    })
  })

  describe("stable constant fixes memo", () => {
    it("preserves reference when map returns undefined", () => {
      const map = new Map<string, AffectedItem[]>()

      const render1 = map.get("rule-1") ?? EMPTY_AFFECTED_ITEMS
      const render2 = map.get("rule-1") ?? EMPTY_AFFECTED_ITEMS

      expect(Object.is(render1, render2)).toBe(true)
    })

    it("preserves reference when map is null", () => {
      const map = makeNullableMap()

      const render1 = map?.get("rule-1") ?? EMPTY_AFFECTED_ITEMS
      const render2 = map?.get("rule-1") ?? EMPTY_AFFECTED_ITEMS

      expect(Object.is(render1, render2)).toBe(true)
    })

    it("still returns the real array when map has the key", () => {
      const items: AffectedItem[] = []
      const map = new Map<string, AffectedItem[]>()
      map.set("rule-1", items)

      const render1 = map.get("rule-1") ?? EMPTY_AFFECTED_ITEMS
      const render2 = map.get("rule-1") ?? EMPTY_AFFECTED_ITEMS

      expect(Object.is(render1, render2)).toBe(true)
      expect(render1).toBe(items)
    })
  })
})
