import type { ArmorSlotId } from "@akasha/temper-equipment-kinds/armor-slots"
import type { JewelrySlotId } from "@akasha/temper-equipment-kinds/jewelry-slots"
import type {
  JewelryItem,
  ShieldItem,
  StandardArmorItem,
  WeaponItem,
} from "../item-composites/item-composites.module.code.ts"

export type WeaponUpdateParams = Partial<WeaponItem>
export type ShieldUpdateParams = Partial<ShieldItem>
export type WeaponSlotUpdateParams = WeaponUpdateParams | ShieldUpdateParams

export type ArmorSlotItem =
  | { itemType: "armor"; data: StandardArmorItem }
  | { itemType: "empty"; data: null }

export type JewelrySlotItem =
  | { itemType: "jewelry"; data: JewelryItem }
  | { itemType: "empty"; data: null }

export type WeaponSlotItem =
  | { itemType: "weapon"; data: WeaponItem }
  | { itemType: "shield"; data: ShieldItem }
  | { itemType: "empty"; data: null }

export interface WeaponSlot {
  "main-hand": WeaponSlotItem
  "off-hand": WeaponSlotItem
}

export interface WeaponBars {
  "primary-weapon-bar": WeaponSlot
  "backup-weapon-bar": WeaponSlot
}

export interface Loadout {
  armor: Record<ArmorSlotId, ArmorSlotItem>
  jewelry: Record<JewelrySlotId, JewelrySlotItem>
  "primary-weapon-bar": WeaponSlot
  "backup-weapon-bar": WeaponSlot
}
