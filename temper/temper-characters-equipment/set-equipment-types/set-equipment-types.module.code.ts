import type { WeaponTypeId } from "@akasha/temper-equipment/weapon-type-ids"
import {
  type ArmorTypeId,
  armorTypes,
  type StandardArmorType,
} from "@akasha/temper-equipment-kinds/armor-types"
import { type JewelryTypeId, jewelryTypes } from "@akasha/temper-equipment-kinds/jewelry-types"
import { weaponTypes } from "../weapon-types-data/weapon-types-data.module.code.ts"
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
