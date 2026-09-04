import type { ItemFacts } from "../item-facts/item-facts.module.code.ts"

export const ESO_CRAFTING_TYPE_BLACKSMITHING = 1
export const ESO_CRAFTING_TYPE_CLOTHIER = 2
export const ESO_CRAFTING_TYPE_WOODWORKING = 6
export const ESO_CRAFTING_TYPE_JEWELRYCRAFTING = 7

const EQUIP_TYPE_NECK = 2
const EQUIP_TYPE_RING = 12

const ARMOR_TYPE_LIGHT = 1
const ARMOR_TYPE_MEDIUM = 2
const ARMOR_TYPE_HEAVY = 3

const WEAPON_TYPE_BOW = 8
const WEAPON_TYPE_HEALING_STAFF = 9
const WEAPON_TYPE_FIRE_STAFF = 12
const WEAPON_TYPE_FROST_STAFF = 13
const WEAPON_TYPE_SHIELD = 14
const WEAPON_TYPE_LIGHTNING_STAFF = 15

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

const ESO_WOODWORKING_WEAPON_TYPES: Record<number, true> = {
  [WEAPON_TYPE_BOW]: true,
  [WEAPON_TYPE_HEALING_STAFF]: true,
  [WEAPON_TYPE_FIRE_STAFF]: true,
  [WEAPON_TYPE_FROST_STAFF]: true,
  [WEAPON_TYPE_SHIELD]: true,
  [WEAPON_TYPE_LIGHTNING_STAFF]: true,
}

export function getTraitMapForCraftingType(
  craftingType: number,
  armorType: number | undefined
): Record<number, string> | undefined {
  if (craftingType === ESO_CRAFTING_TYPE_JEWELRYCRAFTING) return JEWELRY_TRAIT_TYPE_TO_NAME
  if (craftingType === ESO_CRAFTING_TYPE_CLOTHIER) return ARMOR_TRAIT_TYPE_TO_NAME
  if (craftingType === ESO_CRAFTING_TYPE_BLACKSMITHING) {
    return armorType !== undefined && armorType > 0
      ? ARMOR_TRAIT_TYPE_TO_NAME
      : WEAPON_TRAIT_TYPE_TO_NAME
  }
  if (craftingType === ESO_CRAFTING_TYPE_WOODWORKING) return WEAPON_TRAIT_TYPE_TO_NAME
  return undefined
}

export function inferResearchCraftingType(facts: ItemFacts): number | undefined {
  const { equipType, armorType, weaponType, traitType } = facts

  if (traitType === undefined || traitType < 1 || traitType > 33) return undefined

  if (equipType === EQUIP_TYPE_NECK || equipType === EQUIP_TYPE_RING) {
    return ESO_CRAFTING_TYPE_JEWELRYCRAFTING
  }

  if (armorType !== undefined && armorType > 0) {
    return armorType === ARMOR_TYPE_HEAVY
      ? ESO_CRAFTING_TYPE_BLACKSMITHING
      : ESO_CRAFTING_TYPE_CLOTHIER
  }

  if (weaponType !== undefined && weaponType > 0) {
    return ESO_WOODWORKING_WEAPON_TYPES[weaponType] === true
      ? ESO_CRAFTING_TYPE_WOODWORKING
      : ESO_CRAFTING_TYPE_BLACKSMITHING
  }

  return undefined
}

export function inferInspireCraftingType(facts: ItemFacts): number {
  if (facts.equipType === EQUIP_TYPE_NECK || facts.equipType === EQUIP_TYPE_RING) {
    return ESO_CRAFTING_TYPE_JEWELRYCRAFTING
  }

  if (facts.armorType === ARMOR_TYPE_HEAVY) return ESO_CRAFTING_TYPE_BLACKSMITHING
  if (facts.armorType === ARMOR_TYPE_LIGHT || facts.armorType === ARMOR_TYPE_MEDIUM) {
    return ESO_CRAFTING_TYPE_CLOTHIER
  }

  if (facts.weaponType !== undefined && facts.weaponType !== 0) {
    return ESO_WOODWORKING_WEAPON_TYPES[facts.weaponType] === true
      ? ESO_CRAFTING_TYPE_WOODWORKING
      : ESO_CRAFTING_TYPE_BLACKSMITHING
  }

  return 0
}

export function inferResearchTraitKey(facts: ItemFacts):
  | {
      craftingType: number
      traitKey: string
    }
  | undefined {
  if (facts.traitType === undefined) return undefined
  const craftingType = inferResearchCraftingType(facts)
  if (craftingType === undefined) return undefined
  const traitMap = getTraitMapForCraftingType(craftingType, facts.armorType)
  if (traitMap === undefined) return undefined
  const traitName = traitMap[facts.traitType]
  if (traitName === undefined) return undefined
  return { craftingType, traitKey: traitName.toLowerCase() }
}
