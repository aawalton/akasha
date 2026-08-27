import type { CompanionMetricEffect } from "../stats/metrics/companion-metric-template"
import { isCompanionPassiveStatEffect } from "./companion-skill-effect-components"
import { type CompanionSkillId, companionSkills } from "./companion-skills-data"

export function getCompanionPassiveEffects(
  skillId: CompanionSkillId
): readonly CompanionMetricEffect[] {
  const skill = companionSkills.data[skillId]
  if (!skill || skill.skillType !== "passive") {
    return []
  }

  const metricEffects: CompanionMetricEffect[] = []

  for (const effect of skill.effects) {
    if (isCompanionPassiveStatEffect(effect)) {
      const metricEffect: CompanionMetricEffect = {
        metricId: effect.metricId,
        effectType: effect.modifierType,
        effectValue: effect.value,
      }
      metricEffects.push(metricEffect)
    }
  }

  return metricEffects
}
