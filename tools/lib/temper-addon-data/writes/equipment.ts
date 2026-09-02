import type { AddonDataPages } from "../addon-data-pages.ts"
import { generateInventoryTraitMappings } from "../generators/inventory-trait-mappings.ts"
import { generateTemperQuality } from "@akasha/temper-addon-generators/quality"
import { generateTemperArmorEnchant } from "@akasha/temper-addon-generators/temper-armor-enchant"
import { generateTemperArmorSlot } from "@akasha/temper-addon-generators/temper-armor-slot"
import { generateTemperArmorTrait } from "@akasha/temper-addon-generators/temper-armor-trait"
import { generateTemperArmorType } from "@akasha/temper-addon-generators/temper-armor-type"
import { generateTemperArmorWeight } from "@akasha/temper-addon-generators/temper-armor-weight"
import { generateTemperEsoCompanionEquipmentConstant } from "@akasha/temper-addon-generators/temper-eso-companion-equipment-constant"
import { generateTemperEsoPlayerEquipmentConstant } from "@akasha/temper-addon-generators/temper-eso-player-equipment-constant"
import { generateTemperEsoTraitMap } from "@akasha/temper-addon-generators/temper-eso-trait-map"
import { generateTemperJewelryEnchant } from "@akasha/temper-addon-generators/temper-jewelry-enchant"
import { generateTemperJewelrySlot } from "@akasha/temper-addon-generators/temper-jewelry-slot"
import { generateTemperJewelryTrait } from "@akasha/temper-addon-generators/temper-jewelry-trait"
import { generateTemperJewelryType } from "@akasha/temper-addon-generators/temper-jewelry-type"
import { generateTemperWeaponBar } from "@akasha/temper-addon-generators/temper-weapon-bar"
import { generateTemperWeaponEnchant } from "@akasha/temper-addon-generators/temper-weapon-enchant"
import { generateTemperWeaponSlot } from "@akasha/temper-addon-generators/temper-weapon-slot"
import { generateTemperWeaponTrait } from "@akasha/temper-addon-generators/temper-weapon-trait"
import { generateTemperWeaponType } from "@akasha/temper-addon-generators/temper-weapon-type"
import {
  TEMPER_EQUIPMENT_ARMOR_OUTPUT_DIR,
  TEMPER_EQUIPMENT_ENCHANTS_OUTPUT_DIR,
  TEMPER_EQUIPMENT_JEWELRY_OUTPUT_DIR,
  TEMPER_EQUIPMENT_OUTPUT_DIR,
  TEMPER_EQUIPMENT_TRAITS_OUTPUT_DIR,
  TEMPER_EQUIPMENT_WEAPON_OUTPUT_DIR,
  TEMPER_INVENTORY_CORE_OUTPUT_DIR,
  TEMPER_INVENTORY_OUTPUT_DIR,
} from "../output-dirs.ts"

export function buildAddonDataWritesEquipment(
  p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(
      TEMPER_EQUIPMENT_ENCHANTS_OUTPUT_DIR,
      "temper-armor-enchant.generated.ts",
      generateTemperArmorEnchant(p.armorEnchantPages.rows)
    ),
    w(
      TEMPER_EQUIPMENT_ARMOR_OUTPUT_DIR,
      "temper-armor-slot.generated.ts",
      generateTemperArmorSlot(p.armorSlotPages.rows)
    ),
    w(
      TEMPER_EQUIPMENT_TRAITS_OUTPUT_DIR,
      "temper-armor-trait.generated.ts",
      generateTemperArmorTrait(p.armorTraitPages.rows)
    ),
    w(
      TEMPER_EQUIPMENT_ARMOR_OUTPUT_DIR,
      "temper-armor-type.generated.ts",
      generateTemperArmorType(p.armorTypePages.rows)
    ),
    w(
      TEMPER_EQUIPMENT_ARMOR_OUTPUT_DIR,
      "temper-armor-weight.generated.ts",
      generateTemperArmorWeight(p.armorWeightPages.rows)
    ),
    w(
      TEMPER_INVENTORY_CORE_OUTPUT_DIR,
      "temper-eso-companion-equipment-constant.generated.ts",
      generateTemperEsoCompanionEquipmentConstant(p.esoCompanionEquipmentConstantPages.rows)
    ),
    w(
      TEMPER_INVENTORY_CORE_OUTPUT_DIR,
      "temper-eso-player-equipment-constant.generated.ts",
      generateTemperEsoPlayerEquipmentConstant(p.esoPlayerEquipmentConstantPages.rows)
    ),
    w(
      TEMPER_EQUIPMENT_TRAITS_OUTPUT_DIR,
      "temper-eso-trait-map.generated.ts",
      generateTemperEsoTraitMap(p.esoTraitMapPages.rows)
    ),
    w(
      TEMPER_EQUIPMENT_ENCHANTS_OUTPUT_DIR,
      "temper-jewelry-enchant.generated.ts",
      generateTemperJewelryEnchant(p.jewelryEnchantPages.rows)
    ),
    w(
      TEMPER_EQUIPMENT_JEWELRY_OUTPUT_DIR,
      "temper-jewelry-slot.generated.ts",
      generateTemperJewelrySlot(p.jewelrySlotPages.rows)
    ),
    w(
      TEMPER_EQUIPMENT_TRAITS_OUTPUT_DIR,
      "temper-jewelry-trait.generated.ts",
      generateTemperJewelryTrait(p.jewelryTraitPages.rows)
    ),
    w(
      TEMPER_EQUIPMENT_JEWELRY_OUTPUT_DIR,
      "temper-jewelry-type.generated.ts",
      generateTemperJewelryType(p.jewelryTypePages.rows)
    ),
    w(
      TEMPER_EQUIPMENT_WEAPON_OUTPUT_DIR,
      "temper-weapon-type.generated.ts",
      generateTemperWeaponType(p.weaponTypePages.rows)
    ),
    w(
      TEMPER_EQUIPMENT_WEAPON_OUTPUT_DIR,
      "temper-weapon-bar.generated.ts",
      generateTemperWeaponBar(p.weaponBarPages.rows)
    ),
    w(
      TEMPER_EQUIPMENT_WEAPON_OUTPUT_DIR,
      "temper-weapon-slot.generated.ts",
      generateTemperWeaponSlot(p.weaponSlotPages.rows)
    ),
    w(
      TEMPER_EQUIPMENT_TRAITS_OUTPUT_DIR,
      "temper-weapon-trait.generated.ts",
      generateTemperWeaponTrait(p.weaponTraitPages.rows)
    ),
    w(
      TEMPER_EQUIPMENT_ENCHANTS_OUTPUT_DIR,
      "temper-weapon-enchant.generated.ts",
      generateTemperWeaponEnchant(p.weaponEnchantPages.rows)
    ),
    w(
      TEMPER_EQUIPMENT_OUTPUT_DIR,
      "temper-quality.generated.ts",
      generateTemperQuality(p.qualityPages.rows)
    ),
    w(TEMPER_INVENTORY_OUTPUT_DIR, "trait-mappings.generated.ts", generateInventoryTraitMappings()),
  ]
}
