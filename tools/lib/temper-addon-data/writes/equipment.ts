import type { AddonDataPages } from "@akasha/temper-addon-data/addon-data-pages"
import { generateTemperArmorEnchant } from "@akasha/temper-addon-generators/temper-armor-enchant"
import { generateTemperArmorTrait } from "@akasha/temper-addon-generators/temper-armor-trait"
import { generateTemperArmorWeight } from "@akasha/temper-addon-generators/temper-armor-weight"
import { generateTemperEsoCompanionEquipmentConstant } from "@akasha/temper-addon-generators/temper-eso-companion-equipment-constant"
import { generateTemperEsoPlayerEquipmentConstant } from "@akasha/temper-addon-generators/temper-eso-player-equipment-constant"
import { generateTemperEsoTraitMap } from "@akasha/temper-addon-generators/temper-eso-trait-map"
import { generateTemperJewelryEnchant } from "@akasha/temper-addon-generators/temper-jewelry-enchant"
import { generateTemperJewelryTrait } from "@akasha/temper-addon-generators/temper-jewelry-trait"
import { generateTemperWeaponEnchant } from "@akasha/temper-addon-generators/temper-weapon-enchant"
import { generateTemperWeaponTrait } from "@akasha/temper-addon-generators/temper-weapon-trait"
import { generateTemperWeaponType } from "@akasha/temper-addon-generators/temper-weapon-type"
import {
  TEMPER_EQUIPMENT_ARMOR_OUTPUT_DIR,
  TEMPER_EQUIPMENT_ENCHANTS_OUTPUT_DIR,
  TEMPER_EQUIPMENT_TRAITS_OUTPUT_DIR,
  TEMPER_EQUIPMENT_WEAPON_OUTPUT_DIR,
  TEMPER_INVENTORY_CORE_OUTPUT_DIR,
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
      TEMPER_EQUIPMENT_TRAITS_OUTPUT_DIR,
      "temper-armor-trait.generated.ts",
      generateTemperArmorTrait(p.armorTraitPages.rows)
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
      TEMPER_EQUIPMENT_TRAITS_OUTPUT_DIR,
      "temper-jewelry-trait.generated.ts",
      generateTemperJewelryTrait(p.jewelryTraitPages.rows)
    ),
    w(
      TEMPER_EQUIPMENT_WEAPON_OUTPUT_DIR,
      "temper-weapon-type.generated.ts",
      generateTemperWeaponType(p.weaponTypePages.rows)
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
  ]
}
