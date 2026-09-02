import { skills } from "@akasha/temper-character-skills/character-skills"
import type { SkillSource } from "@akasha/temper-formula-framework/skill-source"
import type { Effect } from "@akasha/temper-formula-framework/effect"
import {
  resolveArmorPieceScalingEffects,
  resolveSlottedAbilityScalingEffects,
  resolveWeaponTypeConditionalEffects,
} from "./passive-effect-resolution"
import { buildEligibilityContext, isPassiveEligible } from "./passive-eligibility"
import type { PipelineStage } from "./types"

export const extractPassives: PipelineStage = (build, context) => {
  const sources: SkillSource[] = []
  const eligibilityCtx = buildEligibilityContext(build)

  for (const skillId of build.passives) {
    const skill = skills.data[skillId]
    if (!skill) continue

    if (skill.skillType !== "passive") continue

    if (!isPassiveEligible(skill.skillLineId, eligibilityCtx, context)) {
      continue
    }

    const rawEffects: readonly Effect[] = "effects" in skill && skill.effects ? skill.effects : []

    const weaponTypeIds =
      context.bar === "backup-weapon-bar"
        ? eligibilityCtx.backupBarWeaponTypeIds
        : eligibilityCtx.primaryBarWeaponTypeIds

    const slottedCountsByLine =
      context.bar === "backup-weapon-bar"
        ? eligibilityCtx.backupBarSlottedCountsByLine
        : eligibilityCtx.primaryBarSlottedCountsByLine

    let passiveEffects = resolveWeaponTypeConditionalEffects(rawEffects, weaponTypeIds)
    passiveEffects = resolveSlottedAbilityScalingEffects(passiveEffects, slottedCountsByLine)
    passiveEffects = resolveArmorPieceScalingEffects(
      passiveEffects,
      eligibilityCtx.armorWeightCounts
    )

    sources.push({
      id: `passive-${skill.id}`,
      categoryId: "skills",
      skillId: skill.id,
      esoSkillId: skill.esoSkillId,
      skillName: skill.name,
      skillLineId: skill.skillLineId,
      skillType: skill.skillType,
      effects: passiveEffects,
    })
  }

  return sources
}
