import type { InventoryItemData } from "../inventory-types/inventory-types.module.code.ts"

const CRAFTING_TYPE_INVALID = 0
const CRAFTING_TYPE_BLACKSMITHING = 1
const CRAFTING_TYPE_CLOTHIER = 2
const CRAFTING_TYPE_WOODWORKING = 6
const CRAFTING_TYPE_JEWELRYCRAFTING = 7

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

export function inferDeconCraftingTypeFromItem(item: InventoryItemData): number {
  if (item.equipType === EQUIP_TYPE_NECK || item.equipType === EQUIP_TYPE_RING) {
    return CRAFTING_TYPE_JEWELRYCRAFTING
  }

  if (item.armorType === ARMOR_TYPE_HEAVY) return CRAFTING_TYPE_BLACKSMITHING
  if (item.armorType === ARMOR_TYPE_LIGHT || item.armorType === ARMOR_TYPE_MEDIUM) {
    return CRAFTING_TYPE_CLOTHIER
  }

  if (item.weaponType !== undefined && item.weaponType !== 0) {
    if (
      item.weaponType === WEAPON_TYPE_BOW ||
      item.weaponType === WEAPON_TYPE_SHIELD ||
      item.weaponType === WEAPON_TYPE_FIRE_STAFF ||
      item.weaponType === WEAPON_TYPE_FROST_STAFF ||
      item.weaponType === WEAPON_TYPE_LIGHTNING_STAFF ||
      item.weaponType === WEAPON_TYPE_HEALING_STAFF
    ) {
      return CRAFTING_TYPE_WOODWORKING
    }
    return CRAFTING_TYPE_BLACKSMITHING
  }

  return CRAFTING_TYPE_INVALID
}
