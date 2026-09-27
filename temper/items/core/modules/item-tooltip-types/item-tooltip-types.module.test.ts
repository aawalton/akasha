import { expect, test } from "bun:test"
import {
  type ItemTooltipInstance,
  type MinedItemData,
  resolveItemTooltipData,
} from "akasha/temper/items/core/modules/item-tooltip-types/item-tooltip-types.module.code.ts"

const MINED: MinedItemData = {
  itemId: 141443,
  name: "Savage Werewolf's Mace",
  icon: "",
  itemType: 1,
  specializedItemType: 0,
  equipType: 5,
  weaponType: 2,
  armorType: 0,
  weaponPower: 0,
  armorRating: 0,
  requiredLevel: 0,
  requiredCp: 0,
  merchantValue: 0,
  quality: 0,
  style: 0,
  filterType: 1,
  filterTypeSpecific: 0,
  isUnique: false,
  isUniqueEquipped: false,
  enchantHeader: "Absorb Stamina Enchantment",
  enchantDescription: "Deals |cffffff0|r Physical Damage and restores |cffffff0|r Stamina.",
  hasOnUseAbility: false,
  abilityHeader: "",
  abilityDescription: "",
  abilityCooldown: 0,
  traitType: 0,
  traitDescription: "",
  hasSet: false,
  setId: 0,
  setName: "",
  setMaxEquip: 0,
  setBonuses: null,
  flavorText: "",
  minedAt: "",
}

const INSTANCE: ItemTooltipInstance = {
  quality: 5,
  level: 50,
  bound: true,
  stolen: false,
  stackCount: 1,
  charges: 0,
}

test("an item's own enchant replaces the enchant read off its bare item id", () => {
  const owned = resolveItemTooltipData(MINED, {
    ...INSTANCE,
    enchantHeader: "Absorb Stamina Enchantment",
    enchantDescription: "Deals |cffffff1124|r Physical Damage and restores |cffffff1124|r Stamina.",
  })
  expect(owned.referenceData?.enchantDescription).toBe(
    "Deals |cffffff1124|r Physical Damage and restores |cffffff1124|r Stamina."
  )
  expect(MINED.enchantDescription).toContain("|cffffff0|r")
})

test("an item read with no enchant of its own keeps the enchant its item id was read with", () => {
  expect(resolveItemTooltipData(MINED, INSTANCE).referenceData).toBe(MINED)
})
