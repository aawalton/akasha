import type { StandardArmorType } from "@akasha/temper-equipment-kinds/armor-types"
import type {
  EquipmentQualityId,
  EquipmentQualityOptionId,
} from "@akasha/temper-equipment-kinds/equipment-qualities"
import type { JewelryTypeId } from "@akasha/temper-equipment-kinds/jewelry-types"
import type { ArmorTraitId } from "akasha/temper/temper-equipment/armor-traits/armor-traits.module.code.ts"
import type { StandardArmorWeightId } from "akasha/temper/temper-equipment/armor-weight-ids/armor-weight-ids.module.code.ts"
import type { JewelryTraitId } from "akasha/temper/temper-equipment/jewelry-traits/jewelry-traits.module.code.ts"
import type { SetId } from "akasha/temper/temper-equipment/set-ids/set-ids.module.code.ts"
import type { WeaponTraitId } from "akasha/temper/temper-equipment/weapon-traits/weapon-traits.module.code.ts"
import type { WeaponTypeId } from "akasha/temper/temper-equipment/weapon-type-ids/weapon-type-ids.module.code.ts"
import type { ArmorEnchantId } from "../armor-enchants/armor-enchants.module.code.ts"
import type { JewelryEnchantId } from "../jewelry-enchants/jewelry-enchants.module.code.ts"
import type { WeaponEnchantmentId } from "../weapon-enchants/weapon-enchants.module.code.ts"
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
