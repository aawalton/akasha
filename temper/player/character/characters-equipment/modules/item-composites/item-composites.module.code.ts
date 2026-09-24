import type { Slug } from "akasha/page/properties/slug.text-property.types.ts"
import type { StandardArmorType } from "akasha/temper/catalog/gear/equipment/kind/modules/armor-types/armor-types.module.code.ts"
import type {
  EquipmentQualityId,
  EquipmentQualityOptionId,
} from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import type { JewelryTypeId } from "akasha/temper/catalog/gear/equipment/kind/modules/jewelry-types/jewelry-types.module.code.ts"
import type { ArmorTraitId } from "akasha/temper/catalog/gear/equipment/modules/armor-traits/armor-traits.module.code.ts"
import type { StandardArmorWeightId } from "akasha/temper/catalog/gear/equipment/modules/armor-weight-ids/armor-weight-ids.module.code.ts"
import type { JewelryTraitId } from "akasha/temper/catalog/gear/equipment/modules/jewelry-traits/jewelry-traits.module.code.ts"
import type { WeaponTraitId } from "akasha/temper/catalog/gear/equipment/modules/weapon-traits/weapon-traits.module.code.ts"
import type { WeaponTypeId } from "akasha/temper/catalog/gear/equipment/modules/weapon-type-ids/weapon-type-ids.module.code.ts"
import type { ArmorEnchantId } from "akasha/temper/player/character/characters-equipment/modules/armor-enchants/armor-enchants.module.code.ts"
import type { JewelryEnchantId } from "akasha/temper/player/character/characters-equipment/modules/jewelry-enchants/jewelry-enchants.module.code.ts"
import type { WeaponEnchantmentId } from "akasha/temper/player/character/characters-equipment/modules/weapon-enchants/weapon-enchants.module.code.ts"
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
  set: Slug
  quality?: EquipmentQualityOptionId
  enchantmentQuality?: EquipmentQualityId
  level?: ItemLevel
}

export interface ShieldItem {
  type: "shield"
  weight: "shield"
  trait: ArmorTraitId
  enchantment: ArmorEnchantId
  set: Slug
  quality?: EquipmentQualityOptionId
  enchantmentQuality?: EquipmentQualityId
  level?: ItemLevel
}

export type ArmorItem = StandardArmorItem | ShieldItem

export interface JewelryItem {
  type: JewelryTypeId
  trait: JewelryTraitId
  enchantment: JewelryEnchantId
  set: Slug
  quality?: EquipmentQualityOptionId
  enchantmentQuality?: EquipmentQualityId
  level?: ItemLevel
}

export interface WeaponItem {
  type: WeaponTypeId
  trait: WeaponTraitId
  enchantment: WeaponEnchantmentId
  poison: PoisonId
  set: Slug
  quality?: EquipmentQualityOptionId
  enchantmentQuality?: EquipmentQualityId
  level?: ItemLevel
}
