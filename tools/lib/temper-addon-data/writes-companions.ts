import { generateTemperEsoCompanion } from "@akasha/temper-addon-generators/temper-eso-companion"
import { generateTemperCompanionActivationBuff } from "@akasha/temper-addon-generators/temper-companion-activation-buff"
import { generateTemperCompanionArmorSlot } from "@akasha/temper-addon-generators/temper-companion-armor-slot"
import { generateTemperCompanionBaseRole } from "@akasha/temper-addon-generators/temper-companion-base-role"
import { generateTemperCompanionEquipmentQuality } from "@akasha/temper-addon-generators/temper-companion-equipment-quality"
import { generateTemperCompanionJewelrySlot } from "@akasha/temper-addon-generators/temper-companion-jewelry-slot"
import { generateTemperCompanionPassiveMetric } from "@akasha/temper-addon-generators/temper-companion-passive-metric"
import { generateTemperCompanionRole } from "@akasha/temper-addon-generators/temper-companion-role"
import { generateTemperCompanionSkill } from "@akasha/temper-addon-generators/temper-companion-skill"
import { generateTemperCompanionSkillLine } from "@akasha/temper-addon-generators/temper-companion-skill-line"
import { generateTemperCompanionSkillSlot } from "@akasha/temper-addon-generators/temper-companion-skill-slot"
import { generateTemperCompanionTrait } from "@akasha/temper-addon-generators/temper-companion-trait"
import { generateTemperCompanionWeaponRole } from "@akasha/temper-addon-generators/temper-companion-weapon-role"
import { generateTemperCompanionWeaponSlot } from "@akasha/temper-addon-generators/temper-companion-weapon-slot"
import { generateTemperCompanionWeaponType } from "@akasha/temper-addon-generators/temper-companion-weapon-type"
import { TEMPER_COMPANIONS_OUTPUT_DIR } from "./output-dirs.ts"
import type { AddonDataPages } from "./addon-data-pages"

export function buildAddonDataWritesCompanions(
  p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(
      TEMPER_COMPANIONS_OUTPUT_DIR,
      "temper-eso-companion.generated.ts",
      generateTemperEsoCompanion(p.companionPages.rows)
    ),
    w(
      TEMPER_COMPANIONS_OUTPUT_DIR,
      "temper-companion-activation-buff.generated.ts",
      generateTemperCompanionActivationBuff(p.companionActivationBuffPages.rows)
    ),
    w(
      TEMPER_COMPANIONS_OUTPUT_DIR,
      "temper-companion-armor-slot.generated.ts",
      generateTemperCompanionArmorSlot(p.companionArmorSlotPages.rows)
    ),
    w(
      TEMPER_COMPANIONS_OUTPUT_DIR,
      "temper-companion-base-role.generated.ts",
      generateTemperCompanionBaseRole(p.companionBaseRolePages.rows)
    ),
    w(
      TEMPER_COMPANIONS_OUTPUT_DIR,
      "temper-companion-equipment-quality.generated.ts",
      generateTemperCompanionEquipmentQuality(p.companionEquipmentQualityPages.rows)
    ),
    w(
      TEMPER_COMPANIONS_OUTPUT_DIR,
      "temper-companion-jewelry-slot.generated.ts",
      generateTemperCompanionJewelrySlot(p.companionJewelrySlotPages.rows)
    ),
    w(
      TEMPER_COMPANIONS_OUTPUT_DIR,
      "temper-companion-passive-metric.generated.ts",
      generateTemperCompanionPassiveMetric(p.companionPassiveMetricPages.rows)
    ),
    w(
      TEMPER_COMPANIONS_OUTPUT_DIR,
      "temper-companion-role.generated.ts",
      generateTemperCompanionRole(p.companionRolePages.rows)
    ),
    w(
      TEMPER_COMPANIONS_OUTPUT_DIR,
      "temper-companion-skill.generated.ts",
      generateTemperCompanionSkill(p.companionSkillPages.rows)
    ),
    w(
      TEMPER_COMPANIONS_OUTPUT_DIR,
      "temper-companion-skill-line.generated.ts",
      generateTemperCompanionSkillLine(p.companionSkillLinePages.rows)
    ),
    w(
      TEMPER_COMPANIONS_OUTPUT_DIR,
      "temper-companion-skill-slot.generated.ts",
      generateTemperCompanionSkillSlot(p.companionSkillSlotPages.rows)
    ),
    w(
      TEMPER_COMPANIONS_OUTPUT_DIR,
      "temper-companion-trait.generated.ts",
      generateTemperCompanionTrait(p.companionTraitPages.rows)
    ),
    w(
      TEMPER_COMPANIONS_OUTPUT_DIR,
      "temper-companion-weapon-role.generated.ts",
      generateTemperCompanionWeaponRole(p.companionWeaponRolePages.rows)
    ),
    w(
      TEMPER_COMPANIONS_OUTPUT_DIR,
      "temper-companion-weapon-slot.generated.ts",
      generateTemperCompanionWeaponSlot(p.companionWeaponSlotPages.rows)
    ),
    w(
      TEMPER_COMPANIONS_OUTPUT_DIR,
      "temper-companion-weapon-type.generated.ts",
      generateTemperCompanionWeaponType(p.companionWeaponTypePages.rows)
    ),
  ]
}
