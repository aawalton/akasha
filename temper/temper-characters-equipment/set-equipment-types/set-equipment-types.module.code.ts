import type { WeaponTypeId } from "akasha/temper/temper-equipment/weapon-type-ids/weapon-type-ids.module.code.ts"
import {
  type ArmorTypeId,
  armorTypes,
  type StandardArmorType,
} from "../../equipment-kinds/armor-types/armor-types.module.code.ts"
import {
  type JewelryTypeId,
  jewelryTypes,
} from "../../equipment-kinds/jewelry-types/jewelry-types.module.code.ts"
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
