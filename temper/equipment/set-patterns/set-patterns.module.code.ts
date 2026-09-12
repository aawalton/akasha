import type { StandardArmorWeightId } from "akasha/temper/equipment/modules/armor-weight-ids/armor-weight-ids.module.code.ts"
import type { WeaponTypeId } from "akasha/temper/equipment/weapon-type-ids/weapon-type-ids.module.code.ts"
import type { JewelryTypeId } from "akasha/temper/equipment-kinds/jewelry-types/jewelry-types.module.code.ts"
import type { StandardArmorType } from "akasha/temper/equipment-kinds/modules/armor-types/armor-types.module.code.ts"

export type EquipmentPattern =
  | WeaponTypeId
  | JewelryTypeId
  | "shield"
  | `${StandardArmorType}:${StandardArmorWeightId}`
  | `${StandardArmorType}:*`
  | "armor:*"
  | `armor:${StandardArmorWeightId}`
  | "monster"
  | "weapon:*"
  | "jewelry:*"
  | "*"
  | `*:${StandardArmorWeightId}`
