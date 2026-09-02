import type { StandardArmorType } from "@akasha/temper-equipment-kinds/armor-types"
import type { StandardArmorWeightId } from "./armor/armor-weights-data"
import type { ArmorEnchantId } from "./enchants/armor-enchants-data"
import type { JewelryEnchantId } from "./enchants/jewelry-enchants-data"
import type { WeaponEnchantmentId } from "./enchants/weapon-enchants-data"
import type { JewelryTypeId } from "@akasha/temper-equipment-kinds/jewelry-types"
import type { EquipmentQualityId, EquipmentQualityOptionId } from "@akasha/temper-equipment-kinds/equipment-qualities"
import type { SetId } from "@akasha/temper-equipment/set-ids"
import type { ArmorTraitId } from "./traits/armor-traits-data"
import type { JewelryTraitId } from "./traits/jewelry-traits-data"
import type { WeaponTraitId } from "./traits/weapon-traits-data"
import type { WeaponTypeId } from "./weapons/weapon-types-data"

export type PoisonId = "no-poison"

export type ItemLevel =
  | number
  | "CP160"
  | "CP150"
  | "CP140"
  | "CP130"
  | "CP120"
  | "CP110"
  | "CP100"
  | "CP90"
  | "CP80"
  | "CP70"
  | "CP60"
  | "CP50"
  | "CP40"
  | "CP30"
  | "CP20"
  | "CP10"

export interface StandardArmorItem {
  type: StandardArmorType
  weight: StandardArmorWeightId
  trait: ArmorTraitId
  enchantment: ArmorEnchantId
  set: SetId
  quality?: EquipmentQualityOptionId
  enchantmentQuality?: EquipmentQualityId
  level?: ItemLevel
}

export interface ShieldItem {
  type: "shield"
  weight: "shield"
  trait: ArmorTraitId
  enchantment: ArmorEnchantId
  set: SetId
  quality?: EquipmentQualityOptionId
  enchantmentQuality?: EquipmentQualityId
  level?: ItemLevel
}

export type ArmorItem = StandardArmorItem | ShieldItem

export interface JewelryItem {
  type: JewelryTypeId
  trait: JewelryTraitId
  enchantment: JewelryEnchantId
  set: SetId
  quality?: EquipmentQualityOptionId
  enchantmentQuality?: EquipmentQualityId
  level?: ItemLevel
}

export interface WeaponItem {
  type: WeaponTypeId
  trait: WeaponTraitId
  enchantment: WeaponEnchantmentId
  poison: PoisonId
  set: SetId
  quality?: EquipmentQualityOptionId
  enchantmentQuality?: EquipmentQualityId
  level?: ItemLevel
}
