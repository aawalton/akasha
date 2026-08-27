import type { AddonDataPages } from "../addon-data-pages.ts"
import { generateInventoryTraitMappings } from "../generators/inventory-trait-mappings.ts"
import { generateTemperQuality } from "../generators/quality.ts"
import { generateTemperArmorEnchant } from "../generators/temper-armor-enchant.ts"
import { generateTemperArmorSlot } from "../generators/temper-armor-slot.ts"
import { generateTemperArmorTrait } from "../generators/temper-armor-trait.ts"
import { generateTemperArmorType } from "../generators/temper-armor-type.ts"
import { generateTemperArmorWeight } from "../generators/temper-armor-weight.ts"
import { generateTemperEsoCompanionEquipmentConstant } from "../generators/temper-eso-companion-equipment-constant.ts"
import { generateTemperEsoPlayerEquipmentConstant } from "../generators/temper-eso-player-equipment-constant.ts"
import { generateTemperEsoTraitMap } from "../generators/temper-eso-trait-map.ts"
import { generateTemperJewelryEnchant } from "../generators/temper-jewelry-enchant.ts"
import { generateTemperJewelrySlot } from "../generators/temper-jewelry-slot.ts"
import { generateTemperJewelryTrait } from "../generators/temper-jewelry-trait.ts"
import { generateTemperJewelryType } from "../generators/temper-jewelry-type.ts"
import { generateTemperWeaponBar } from "../generators/temper-weapon-bar.ts"
import { generateTemperWeaponEnchant } from "../generators/temper-weapon-enchant.ts"
import { generateTemperWeaponSlot } from "../generators/temper-weapon-slot.ts"
import { generateTemperWeaponTrait } from "../generators/temper-weapon-trait.ts"
import { generateTemperWeaponType } from "../generators/temper-weapon-type.ts"
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
