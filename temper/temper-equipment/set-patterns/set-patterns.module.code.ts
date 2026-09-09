import type { StandardArmorType } from "../../equipment-kinds/armor-types/armor-types.module.code.ts"
import type { JewelryTypeId } from "../../equipment-kinds/jewelry-types/jewelry-types.module.code.ts"
import type { StandardArmorWeightId } from "../armor-weight-ids/armor-weight-ids.module.code.ts"
import type { WeaponTypeId } from "../weapon-type-ids/weapon-type-ids.module.code.ts"

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
