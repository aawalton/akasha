import { ESO_EQUIP_TYPES } from "@akasha/temper-items-core/eso-companion-equipment-constants-data"
import type { InventoryItemData } from "@akasha/temper-items-core/inventory-types"

const WEAPON_TRAIT_TYPE_TO_NAME: Record<number, string> = {
  1: "Powered",
  2: "Charged",
  3: "Precise",
  4: "Infused",
  5: "Defending",
  6: "Training",
  7: "Sharpened",
  8: "Decisive",
  9: "Nirnhoned",
  10: "Ornate",
  11: "Intricate",
}

const ARMOR_TRAIT_TYPE_TO_NAME: Record<number, string> = {
  12: "Sturdy",
  13: "Impenetrable",
  14: "Reinforced",
  15: "Well-Fitted",
  16: "Training",
  17: "Infused",
  18: "Invigorating",
  19: "Divines",
  20: "Nirnhoned",
  21: "Ornate",
  22: "Intricate",
}

const JEWELRY_TRAIT_TYPE_TO_NAME: Record<number, string> = {
  21: "Healthy",
  22: "Arcane",
  23: "Robust",
  24: "Ornate",
  27: "Intricate",
  28: "Swift",
  29: "Harmony",
  30: "Triune",
  31: "Bloodthirsty",
  32: "Protective",
  33: "Infused",
}

const ESO_CRAFTING_TYPE_BLACKSMITHING = 1
const ESO_CRAFTING_TYPE_CLOTHIER = 2
const ESO_CRAFTING_TYPE_WOODWORKING = 6
const ESO_CRAFTING_TYPE_JEWELRYCRAFTING = 7

function getTraitMapForCraftingType(
  craftingType: number,
  item: InventoryItemData
): Record<number, string> | undefined {
  if (craftingType === ESO_CRAFTING_TYPE_JEWELRYCRAFTING) return JEWELRY_TRAIT_TYPE_TO_NAME
  if (craftingType === ESO_CRAFTING_TYPE_CLOTHIER) return ARMOR_TRAIT_TYPE_TO_NAME
  if (craftingType === ESO_CRAFTING_TYPE_BLACKSMITHING) {
    return item.armorType !== undefined && item.armorType > 0
      ? ARMOR_TRAIT_TYPE_TO_NAME
      : WEAPON_TRAIT_TYPE_TO_NAME
  }
  if (craftingType === ESO_CRAFTING_TYPE_WOODWORKING) return WEAPON_TRAIT_TYPE_TO_NAME
  return undefined
}

const ESO_WOODWORKING_WEAPON_TYPES = new Set([8, 9, 12, 13, 14, 15])

function inferItemCraftingType(item: InventoryItemData): number | undefined {
  const { equipType, armorType, weaponType, traitType } = item

  if (traitType < 1 || traitType > 33) return undefined

  if (
    equipType === ESO_EQUIP_TYPES.EQUIP_TYPE_NECK ||
    equipType === ESO_EQUIP_TYPES.EQUIP_TYPE_RING
  ) {
    return ESO_CRAFTING_TYPE_JEWELRYCRAFTING
  }

  if (armorType !== undefined && armorType > 0) {
    return armorType === 3 ? ESO_CRAFTING_TYPE_BLACKSMITHING : ESO_CRAFTING_TYPE_CLOTHIER
  }

  if (weaponType !== undefined && weaponType > 0) {
    return ESO_WOODWORKING_WEAPON_TYPES.has(weaponType)
      ? ESO_CRAFTING_TYPE_WOODWORKING
      : ESO_CRAFTING_TYPE_BLACKSMITHING
  }

  return undefined
}

export function isTraitResearchableByAnyCharacter(
  item: InventoryItemData,
  researchedTraitsByCharacter: Map<string, Map<number, Map<string, boolean>>>
): boolean {
  const craftingType = inferItemCraftingType(item)
  if (craftingType === undefined) return false

  const traitMap = getTraitMapForCraftingType(craftingType, item)
  const traitName = traitMap?.[item.traitType]
  if (traitName == null) return false

  const traitKey = traitName.toLowerCase()

  for (const craftMap of researchedTraitsByCharacter.values()) {
    const traitKnown = craftMap.get(craftingType)
    if (!traitKnown) continue
    const known = traitKnown.get(traitKey)
    if (known === false) return true
  }
  return false
}
