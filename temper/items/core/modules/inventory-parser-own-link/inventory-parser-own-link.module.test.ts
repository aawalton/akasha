import { expect, test } from "bun:test"
import { parseOwnLinkValues } from "akasha/temper/items/core/modules/inventory-parser-own-link/inventory-parser-own-link.module.code.ts"
import type { InventoryItemData } from "akasha/temper/items/core/modules/inventory-types/inventory-types.module.code.ts"

function parsedOf(item: Record<string, unknown>): InventoryItemData {
  const parsed: InventoryItemData = {
    itemId: 141443,
    itemName: "Savage Werewolf's Mace",
    itemLink: "",
    quality: 5,
    filterType: 1,
    itemType: 1,
    traitType: 2,
    requiredLevel: 50,
    requiredCP: 160,
    stackCount: 1,
  }
  parseOwnLinkValues(item, parsed)
  return parsed
}

test("the values a slot's own link was read with are kept, set bonuses in their order", () => {
  const parsed = parsedOf({
    weaponPower: 1335,
    armorRating: 0,
    traitDescription: "Increases Enchantment charges.",
    abilityHeader: "Use",
    abilityDescription: "Restores Health.",
    abilityCooldown: 3,
    setBonuses: {
      "2": { numRequired: 3, description: "Adds 129 Weapon Damage.", isPerfected: false },
      "1": { numRequired: 2, description: "Adds 1096 Max Stamina.", isPerfected: false },
      "3": { numRequired: 4, description: "", isPerfected: false },
    },
  })
  expect(parsed.weaponPower).toBe(1335)
  expect(parsed.armorRating).toBeUndefined()
  expect(parsed.traitDescription).toBe("Increases Enchantment charges.")
  expect(parsed.abilityHeader).toBe("Use")
  expect(parsed.abilityDescription).toBe("Restores Health.")
  expect(parsed.abilityCooldown).toBe(3)
  expect(parsed.setBonuses).toEqual([
    { numRequired: 2, description: "Adds 1096 Max Stamina.", isPerfected: false },
    { numRequired: 3, description: "Adds 129 Weapon Damage.", isPerfected: false },
  ])
})

test("a slot read with none of these values gets none of them", () => {
  const parsed = parsedOf({ abilityHeader: "Use", setBonuses: {} })
  expect(parsed.weaponPower).toBeUndefined()
  expect(parsed.traitDescription).toBeUndefined()
  expect(parsed.abilityHeader).toBeUndefined()
  expect(parsed.setBonuses).toBeUndefined()
})
