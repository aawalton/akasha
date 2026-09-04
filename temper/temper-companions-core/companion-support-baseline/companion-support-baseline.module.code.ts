import { targetArmor } from "@akasha/temper-character-sources/target-armors"
import {
  COMPANION_METRIC_IDS,
  type CompanionMetricId,
} from "../companion-metric-ids/companion-metric-ids.module.code.ts"
import type { CompanionEffect } from "../companion-skill-effect-components/companion-skill-effect-components.module.code.ts"
import { companionSkills } from "../companion-skills/companion-skills.module.code.ts"
import { calculateCompanionStatsWithBaseline } from "../companion-stats-calculator-impl/companion-stats-calculator-impl.module.code.ts"
import {
  accumulateDamageBuffDelta,
  getCritChancePercent,
} from "../companion-support-buff-math/companion-support-buff-math.module.code.ts"
import {
  EMPTY_BASELINE,
  type ReferenceBaseline,
} from "../companion-support-types/companion-support-types.module.code.ts"
import type { CompanionState } from "../companion-types/companion-types.module.code.ts"

export function computeReferenceBaseline(build: CompanionState): ReferenceBaseline {
  const result = calculateCompanionStatsWithBaseline(build, EMPTY_BASELINE)
  const rotation = result.rotation
  const metricValues = new Map<CompanionMetricId, number>()

  for (const id of COMPANION_METRIC_IDS) {
    const metric = result.metrics[id]
    if (metric) metricValues.set(id, metric.value)
  }

  const buffUptimes = new Map<string, number>()
  let damageBuffMultiplier = 1
  let vulnerabilityMultiplier = 1
  let breachPenetration = 0

  const basePenetration = metricValues.get("companion-penetration") ?? 0
  const targetArmorValue = targetArmor.data[build.target.armor].armor

  if (rotation) {
    for (const summary of rotation.skillSummaries) {
      if (summary.uptime <= 0 || summary.skillId === "light-attack") continue

      const skill = companionSkills.data[summary.skillId]
      if (!skill) continue

      const critChance = getCritChancePercent(metricValues)
      const effects: readonly CompanionEffect[] = skill.effects
      for (const effect of effects) {
        if (effect.type === "apply-buff" && effect.buff) {
          const { buff, value, valueType } = effect.buff
          buffUptimes.set(buff, Math.max(buffUptimes.get(buff) ?? 0, summary.uptime))
          damageBuffMultiplier += accumulateDamageBuffDelta(
            buff,
            value,
            valueType,
            summary.uptime,
            critChance
          )
        }
        if (effect.type === "apply-debuff" && effect.debuff) {
          const { debuff, value, valueType } = effect.debuff
          buffUptimes.set(debuff, Math.max(buffUptimes.get(debuff) ?? 0, summary.uptime))
          if (debuff === "major-breach" || debuff === "minor-breach") {
            if (valueType === "integer" && typeof value === "number") {
              breachPenetration += value * summary.uptime
            }
          }
          if (
            debuff === "major-vulnerability" ||
            debuff === "minor-vulnerability" ||
            debuff === "damage-taken-increase"
          ) {
            if (valueType === "fractional-change" && typeof value === "number") {
              vulnerabilityMultiplier += value * summary.uptime
            }
          }
        }
      }
    }
  }

  let referenceLaDpsFraction = 0
  if (rotation) {
    const totalRawDamage = rotation.directDamage + rotation.dotDamage
    if (totalRawDamage > 0) {
      const laSummary = rotation.skillSummaries.find((s) => s.skillId === "light-attack")
      if (laSummary) {
        referenceLaDpsFraction = laSummary.totalDamage / totalRawDamage
      }
    }
  }

  const baseToughness = metricValues.get("companion-effective-toughness") ?? 0
  const healthMax = metricValues.get("companion-health-maximum") ?? 30000
  const damageTakenMod = metricValues.get("companion-damage-taken") ?? 0
  const baseArmor = metricValues.get("companion-armor") ?? 0

  return {
    buffUptimes,
    referenceDps: result.metrics["companion-dps-total"]?.value ?? 0,
    baseDamageBuffMultiplier: damageBuffMultiplier,
    baseVulnerabilityMultiplier: vulnerabilityMultiplier,
    baseBreachPenetration: breachPenetration,
    basePenetration,
    targetArmor: targetArmorValue,
    baseToughness,
    healthMax,
    baseArmor,
    damageTakenMult: 1 + damageTakenMod,
    critChancePercent: getCritChancePercent(metricValues),
    referenceLaDpsFraction,
  }
}
