import { generateTemperEsoCompanion } from "./generators/temper-eso-companion.ts"
import { generateTemperCompanionActivationBuff } from "./generators/temper-companion-activation-buff.ts"
import { generateTemperCompanionArmorSlot } from "./generators/temper-companion-armor-slot.ts"
import { generateTemperCompanionBaseRole } from "./generators/temper-companion-base-role.ts"
import { generateTemperCompanionEquipmentQuality } from "./generators/temper-companion-equipment-quality.ts"
import { generateTemperCompanionJewelrySlot } from "./generators/temper-companion-jewelry-slot.ts"
import { generateTemperCompanionPassiveMetric } from "./generators/temper-companion-passive-metric.ts"
import { generateTemperCompanionRole } from "./generators/temper-companion-role.ts"
import { generateTemperCompanionSkill } from "./generators/temper-companion-skill.ts"
import { generateTemperCompanionSkillLine } from "./generators/temper-companion-skill-line.ts"
import { generateTemperCompanionSkillSlot } from "./generators/temper-companion-skill-slot.ts"
import { generateTemperCompanionTrait } from "./generators/temper-companion-trait.ts"
import { generateTemperCompanionWeaponRole } from "./generators/temper-companion-weapon-role.ts"
import { generateTemperCompanionWeaponSlot } from "./generators/temper-companion-weapon-slot.ts"
import { generateTemperCompanionWeaponType } from "./generators/temper-companion-weapon-type.ts"
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
