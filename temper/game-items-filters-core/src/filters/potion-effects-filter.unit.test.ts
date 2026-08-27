import { describe, expect, it } from "bun:test"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import { potionEffectsFilter } from "./potion-effects-filter"

const baseFacts = { itemId: 1, itemName: "Test Item", itemLink: "|H0:item:1:|h|h" } as const

const healthPotion: ItemFacts = { ...baseFacts, potionEffectMetricIds: ["health-restore"] }
const magickaPotion: ItemFacts = { ...baseFacts, potionEffectMetricIds: ["magicka-restore"] }
const nonPotion: ItemFacts = { ...baseFacts }

describe("potionEffectsFilter", () => {
  it("matches anything when the selection is empty", () => {
    expect(potionEffectsFilter.matches(healthPotion, [])).toBe(true)
    expect(potionEffectsFilter.matches(nonPotion, [])).toBe(true)
  })

  it("matches a potion that grants at least one selected effect (any mode)", () => {
    expect(potionEffectsFilter.matches(healthPotion, ["health-restore"])).toBe(true)
  })

  it("rejects a potion that grants none of the selected effects", () => {
    expect(potionEffectsFilter.matches(magickaPotion, ["health-restore"])).toBe(false)
  })

  it("fails closed when potionEffectMetricIds is undefined (a non-potion)", () => {
    expect(potionEffectsFilter.matches(nonPotion, ["health-restore"])).toBe(false)
  })

  it("deserialize round-trips an array and rejects non-arrays", () => {
    expect(
      potionEffectsFilter.deserialize(
        potionEffectsFilter.serialize(["health-restore", "magicka-restore"])
      )
    ).toEqual(["health-restore", "magicka-restore"])
    expect(potionEffectsFilter.deserialize("nonsense")).toBeUndefined()
    expect(potionEffectsFilter.deserialize(42)).toBeUndefined()
    expect(potionEffectsFilter.deserialize([1, 2])).toBeUndefined()
  })
})
