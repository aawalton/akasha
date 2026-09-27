import { expect, test } from "bun:test"
import { ownValuesOf } from "akasha/temper/items/core/modules/inventory-grouping/inventory-grouping.module.code.ts"
import type { InventoryItemData } from "akasha/temper/items/core/modules/inventory-types/inventory-types.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"

holdSkillCatalogFromCheckout()

const MACE: InventoryItemData = {
  itemId: 141443,
  itemName: "Savage Werewolf's Mace",
  itemLink: "|H1:item:141443:364:50:26587:370:50:2:46:0:0:0:0:0:0:2049:78:0:1:0:399:0|h|h",
  quality: 5,
  filterType: 1,
  itemType: 1,
  traitType: 2,
  requiredLevel: 50,
  requiredCP: 160,
  stackCount: 1,
}

test("a slot read before its link's own values were captured still gives its level and CP", () => {
  expect(ownValuesOf(MACE)).toEqual({ requiredLevel: 50, requiredCp: 160 })
})

test("a slot's own link values reach the tooltip, its trait type going with its trait text", () => {
  const bonuses = [{ numRequired: 2, description: "Adds 1096 Max Stamina.", isPerfected: false }]
  expect(
    ownValuesOf({
      ...MACE,
      merchantValue: 26,
      weaponPower: 1335,
      traitDescription: "Increases Enchantment charges.",
      abilityHeader: "Use",
      abilityDescription: "Restores Health.",
      setBonuses: bonuses,
    })
  ).toEqual({
    requiredLevel: 50,
    requiredCp: 160,
    merchantValue: 26,
    weaponPower: 1335,
    traitType: 2,
    traitDescription: "Increases Enchantment charges.",
    hasOnUseAbility: true,
    abilityHeader: "Use",
    abilityDescription: "Restores Health.",
    abilityCooldown: 0,
    setBonuses: bonuses,
  })
})

test("a slot with no level and nothing read off its own link gives no values", () => {
  expect(ownValuesOf({ ...MACE, requiredLevel: 0, requiredCP: 0 })).toBeUndefined()
})
