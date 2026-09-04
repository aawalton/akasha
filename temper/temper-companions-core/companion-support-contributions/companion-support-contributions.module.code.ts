import { convertRatingToChance } from "@akasha/temper-formula-framework/rating-chance"
import { companionMetrics } from "../companion-metrics/companion-metrics.module.code.ts"
import type { CompanionEffect } from "../companion-skill-effect-components/companion-skill-effect-components.module.code.ts"
import { companionSkills } from "../companion-skills/companion-skills.module.code.ts"
import type { CompanionStatsResult } from "../companion-stats-result/companion-stats-result.module.code.ts"
import { accumulateDamageBuffDelta } from "../companion-support-buff-math/companion-support-buff-math.module.code.ts"
import {
  ALLY_VISIBLE_BUFF_TARGETS,
  type BuffUptimeEntry,
  type ReferenceBaseline,
} from "../companion-support-types/companion-support-types.module.code.ts"

export function extractAllyVisibleBuffUptimes(
  result: CompanionStatsResult
): readonly BuffUptimeEntry[] {
  const rotation = result.rotation
  if (!rotation) return []

  const entries: BuffUptimeEntry[] = []

  for (const summary of rotation.skillSummaries) {
    if (summary.uptime <= 0 || summary.skillId === "light-attack") continue

    const skill = companionSkills.data[summary.skillId]
    if (!skill) continue

    const effects: readonly CompanionEffect[] = skill.effects
    for (const effect of effects) {
      if (effect.type === "apply-buff" && effect.buff) {
        if (!ALLY_VISIBLE_BUFF_TARGETS.has(effect.target.type)) continue
        entries.push({
          name: effect.buff.buff,
          uptime: summary.uptime,
          value: effect.buff.value,
          valueType: effect.buff.valueType,
          effectType: "buff",
        })
      }
      if (effect.type === "apply-debuff" && effect.debuff) {
        if (effect.target.type !== "enemy") continue
        entries.push({
          name: effect.debuff.debuff,
          uptime: summary.uptime,
          value: effect.debuff.value,
          valueType: effect.debuff.valueType,
          effectType: "debuff",
        })
      }
    }
  }

  return entries
}

export function computeSupportDpsContribution(
  supportBuffs: readonly BuffUptimeEntry[],
  baseline: ReferenceBaseline
): number {
  let damageBuffDelta = 0
  let vulnerabilityDelta = 0
  let breachPenetrationDelta = 0
  let laDamageBuffDelta = 0

  for (const entry of supportBuffs) {
    const { name, value, valueType, uptime } = entry

    if (entry.effectType === "buff") {
      if (
        name === "light-attack-damage" ||
        name === "heavy-attack-damage" ||
        name === "next-attack-damage"
      ) {
        if (valueType === "fractional-change" && typeof value === "number") {
          laDamageBuffDelta += value * uptime
        }
      } else {
        damageBuffDelta += accumulateDamageBuffDelta(
          name,
          value,
          valueType,
          uptime,
          baseline.critChancePercent
        )
      }
    }

    if (entry.effectType === "debuff") {
      if (name === "major-breach" || name === "minor-breach") {
        if (valueType === "integer" && typeof value === "number") {
          breachPenetrationDelta += value * uptime
        }
      }
      if (
        name === "major-vulnerability" ||
        name === "minor-vulnerability" ||
        name === "damage-taken-increase"
      ) {
        if (valueType === "fractional-change" && typeof value === "number") {
          vulnerabilityDelta += value * uptime
        }
      }
    }
  }

  const newDamageBuffMult = baseline.baseDamageBuffMultiplier + damageBuffDelta
  const newVulnerabilityMult = baseline.baseVulnerabilityMultiplier + vulnerabilityDelta

  const totalPenBase = baseline.basePenetration + baseline.baseBreachPenetration
  const totalPenNew = totalPenBase + breachPenetrationDelta

  const remainingArmorBase = Math.max(0, baseline.targetArmor - totalPenBase)
  const mitigationBase = Math.min(remainingArmorBase / 50000, 0.5)
  const dmgMultBase = 1 - mitigationBase

  const remainingArmorNew = Math.max(0, baseline.targetArmor - totalPenNew)
  const mitigationNew = Math.min(remainingArmorNew / 50000, 0.5)
  const dmgMultNew = 1 - mitigationNew

  const breachMultNew = dmgMultBase > 0 ? dmgMultNew / dmgMultBase : 1

  const baseTotal = baseline.baseDamageBuffMultiplier * baseline.baseVulnerabilityMultiplier
  const newTotal = newDamageBuffMult * newVulnerabilityMult * breachMultNew

  if (baseTotal <= 0) return 0

  const generalDelta = baseline.referenceDps * (newTotal / baseTotal - 1)

  const laDelta = baseline.referenceDps * baseline.referenceLaDpsFraction * laDamageBuffDelta

  return Math.max(0, generalDelta + laDelta)
}

export function computeSupportTpsContribution(
  supportBuffs: readonly BuffUptimeEntry[],
  baseline: ReferenceBaseline
): number {
  let buffToughness = 0

  const armorMetric = companionMetrics.data["companion-armor"]
  const armorDivisor = armorMetric.valueType === "rating" ? armorMetric.divisor : 50000
  const armorCap = armorMetric.valueType === "rating" ? armorMetric.cap : 1
  const baseMitigation = convertRatingToChance(baseline.baseArmor, armorDivisor, armorCap)

  for (const entry of supportBuffs) {
    const { uptime } = entry

    if (entry.effectType === "buff") {
      const { name, value } = entry

      if (name === "major-resolve" || name === "minor-resolve" || name === "flat-resistance") {
        const buffArmor = value ?? 0
        const buffedMitigation = convertRatingToChance(
          baseline.baseArmor + buffArmor,
          armorDivisor,
          armorCap
        )
        const incrementalMitigation = buffedMitigation - baseMitigation
        const armorContribution =
          (baseline.healthMax * incrementalMitigation) / baseline.damageTakenMult
        buffToughness += armorContribution * uptime
      }

      if (name === "major-protection") {
        buffToughness += baseline.baseToughness * 0.1 * uptime
      }
      if (name === "minor-protection") {
        buffToughness += baseline.baseToughness * 0.05 * uptime
      }

      if (name === "flat-damage-reduction" && typeof value === "number") {
        buffToughness += baseline.baseToughness * value * uptime
      }
    }

    if (entry.effectType === "debuff") {
      const { name } = entry

      if (name === "major-maim") {
        buffToughness += baseline.baseToughness * 0.1 * uptime
      }
      if (name === "minor-maim") {
        buffToughness += baseline.baseToughness * 0.05 * uptime
      }
    }
  }

  return buffToughness
}
