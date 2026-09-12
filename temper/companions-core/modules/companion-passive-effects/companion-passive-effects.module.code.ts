import type { CompanionMetricEffect } from "akasha/temper/companions-core/modules/companion-metric-effect/companion-metric-effect.module.code.ts"
import { isCompanionPassiveStatEffect } from "akasha/temper/companions-core/modules/companion-skill-effect-components/companion-skill-effect-components.module.code.ts"
import {
  type CompanionSkillId,
  companionSkills,
} from "akasha/temper/companions-core/modules/companion-skills/companion-skills.module.code.ts"

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
