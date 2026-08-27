import { type ArmorTypeId, armorTypes, type StandardArmorType } from "../armor/armor-types-data"
import { type JewelryTypeId, jewelryTypes } from "../jewelry/jewelry-types-data"
import { type WeaponTypeId, weaponTypes } from "../weapons/weapon-types-data"

export type EquipmentType = WeaponTypeId | JewelryTypeId | ArmorTypeId

export function isStandardArmorType(value: string): value is StandardArmorType {
  if (value === "shield") return false
  return armorTypes.has(value)
}

export function isJewelryType(value: string): value is JewelryTypeId {
  return jewelryTypes.has(value)
}

export function isWeaponType(value: string): value is WeaponTypeId {
  return weaponTypes.has(value)
}
