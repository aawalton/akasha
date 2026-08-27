import { describe, expect, test } from "bun:test"
import { POTION_EFFECTS_OPTIONS, potionEffectsFilter } from "./potion-effects-filter"

describe("potionEffectsFilter", () => {
  test("id and registry-facing metadata", () => {
    expect(potionEffectsFilter.id).toBe("potion-effects")
    expect(potionEffectsFilter.mutuallyExclusive).toEqual([])
  })

  test("eligible under the potions root, ineligible elsewhere", () => {
    expect(potionEffectsFilter.isEligible("potions", {})).toBe(true)
    expect(potionEffectsFilter.isEligible("equipment", {})).toBe(false)
  })

  test("options cover the three restore metric ids", () => {
    expect(POTION_EFFECTS_OPTIONS.map((o) => o.value)).toEqual([
      "health-restore",
      "magicka-restore",
      "stamina-restore",
    ])
  })

  test("isPresent reflects a non-empty effects list", () => {
    expect(potionEffectsFilter.isPresent(undefined)).toBe(false)
    expect(potionEffectsFilter.isPresent({})).toBe(false)
    expect(potionEffectsFilter.isPresent({ potionEffects: [] })).toBe(false)
    expect(potionEffectsFilter.isPresent({ potionEffects: ["health-restore"] })).toBe(true)
  })

  test("fingerprint is mode-prefixed and order-insensitive", () => {
    expect(potionEffectsFilter.fingerprint({})).toBeUndefined()
    expect(potionEffectsFilter.fingerprint({ potionEffects: [] })).toBeUndefined()
    expect(potionEffectsFilter.fingerprint({ potionEffects: ["stamina-restore"] })).toBe(
      "any:stamina-restore"
    )
    expect(
      potionEffectsFilter.fingerprint({
        potionEffects: ["stamina-restore", "health-restore"],
        potionEffectsMode: "all",
      })
    ).toBe("all:health-restore,stamina-restore")
  })

  test("clear removes both keys", () => {
    expect(potionEffectsFilter.clear()).toEqual({
      potionEffects: undefined,
      potionEffectsMode: undefined,
    })
  })

  test("transferToCategory carries effects (and mode when set) forward", () => {
    expect(
      potionEffectsFilter.transferToCategory(
        { potionEffects: ["health-restore"], potionEffectsMode: "all" },
        "a",
        "b",
        {}
      )
    ).toEqual({ potionEffects: ["health-restore"], potionEffectsMode: "all" })
    expect(
      potionEffectsFilter.transferToCategory({ potionEffects: ["health-restore"] }, "a", "b", {})
    ).toEqual({ potionEffects: ["health-restore"] })
    expect(potionEffectsFilter.transferToCategory({}, "a", "b", {})).toEqual({})
  })
})
