import { targetArmor } from "@akasha/temper-character-sources/target-armors"
import { convertRatingToChance } from "@akasha/temper-formula-framework/rating-chance"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import type { CompanionMetricId } from "../companion-metric-ids/companion-metric-ids.module.code.ts"
import {
  type CompanionMetricValue,
  companionMetrics,
} from "../companion-metrics/companion-metrics.module.code.ts"
import type { CompanionEffect } from "../companion-skill-effect-components/companion-skill-effect-components.module.code.ts"
import { companionSkills } from "../companion-skills/companion-skills.module.code.ts"
import type { CompanionState } from "../companion-types/companion-types.module.code.ts"
import type { CompanionValueFormula } from "../companion-value-formula/companion-value-formula.module.code.ts"
import type { RotationResult } from "../rotation-types/rotation-types.module.code.ts"

export interface RotationMetricEntry {
  metricId: CompanionMetricId
  value: number
}

function evaluateShieldFormula(
  formula: CompanionValueFormula,
  metricValues: Map<CompanionMetricId, number>
): number {
  switch (formula.type) {
    case "metric-scaling": {
      const metricValue =
        metricValues.get(formula.metricId) ??
        (formula.metricId === "companion-weapon-damage" ? 2000 : 30000)
      return formula.coefficient * metricValue
    }
    case "metric-percent": {
      const metricValue =
        metricValues.get(formula.metricId) ??
        (formula.metricId === "companion-weapon-damage" ? 2000 : 30000)
      return (formula.percent / 100) * metricValue
    }
    case "player-health-percent":
      return (formula.percent / 100) * 25000
    case "fixed":
      return formula.value
    default:
      assertNever(formula)
  }
}

export function computeDpsMetrics(
  rotation: RotationResult,
  metricValues: Map<CompanionMetricId, number>,
  build: CompanionState,
  cycleDuration: number
): readonly RotationMetricEntry[] {
  if (rotation.dps <= 0 && rotation.hps <= 0) return []

  const entries: RotationMetricEntry[] = []

  let damageBuffMultiplier = 1
  let vulnerabilityMultiplier = 1
  let breachPenetration = 0

  const basePenetration = metricValues.get("companion-penetration") ?? 0
  const targetArmorValue = targetArmor.data[build.target.armor].armor

  for (const summary of rotation.skillSummaries) {
    if (summary.uptime <= 0) continue
    if (summary.skillId === "light-attack") continue

    const skill = companionSkills.data[summary.skillId]
    if (!skill) continue

    const effects: readonly CompanionEffect[] = skill.effects
    for (const effect of effects) {
      if (effect.type === "apply-buff" && effect.buff) {
        const { buff, value, valueType } = effect.buff

        if (buff === "major-berserk" || buff === "minor-berserk") {
          if (valueType === "fractional-change" && typeof value === "number") {
            damageBuffMultiplier += value * summary.uptime
          }
        }

        if (
          buff === "major-brutality" ||
          buff === "minor-brutality" ||
          buff === "major-sorcery" ||
          buff === "minor-sorcery"
        ) {
          if (valueType === "fractional-change" && typeof value === "number") {
            damageBuffMultiplier += value * summary.uptime
          }
        }

        if (buff === "major-force" || buff === "minor-force") {
          if (valueType === "fractional-change" && typeof value === "number") {
            const critRating = metricValues.get("companion-critical-chance") ?? 0
            const critMetric = companionMetrics.data["companion-critical-chance"]
            const critChancePercent =
              critMetric.valueType === "rating"
                ? convertRatingToChance(
                    critRating,
                    critMetric.divisor,
                    critMetric.cap,
                    critMetric.ratingFloorIncrement
                  )
                : 0
            damageBuffMultiplier += value * critChancePercent * summary.uptime
          }
        }

        if (buff === "minor-slayer") {
          if (valueType === "fractional-change" && typeof value === "number") {
            damageBuffMultiplier += value * summary.uptime
          }
        }
      }

      if (effect.type === "apply-debuff" && effect.debuff) {
        const { debuff, value, valueType } = effect.debuff

        if (debuff === "major-breach" || debuff === "minor-breach") {
          if (valueType === "integer" && typeof value === "number") {
            breachPenetration += value * summary.uptime
          }
        }

        if (debuff === "major-vulnerability" || debuff === "minor-vulnerability") {
          if (valueType === "fractional-change" && typeof value === "number") {
            vulnerabilityMultiplier += value * summary.uptime
          }
        }
      }
    }
  }

  const totalPenetration = basePenetration + breachPenetration
  const remainingArmorWithBreach = Math.max(0, targetArmorValue - totalPenetration)
  const mitigationWithBreach = Math.min(remainingArmorWithBreach / 50000, 0.5)
  const damageMultiplierWithBreach = 1 - mitigationWithBreach

  const remainingArmorBase = Math.max(0, targetArmorValue - basePenetration)
  const mitigationBase = Math.min(remainingArmorBase / 50000, 0.5)
  const damageMultiplierBase = 1 - mitigationBase

  const breachMultiplier =
    damageMultiplierBase > 0 ? damageMultiplierWithBreach / damageMultiplierBase : 1

  const totalDpsMultiplier = damageBuffMultiplier * vulnerabilityMultiplier * breachMultiplier

  const rawDirectDps = rotation.directDamage / cycleDuration
  const rawDotDps = rotation.dotDamage / cycleDuration
  const buffedDirectDps = rawDirectDps * totalDpsMultiplier
  const buffedDotDps = rawDotDps * totalDpsMultiplier

  if (buffedDirectDps > 0) {
    entries.push({ metricId: "companion-dps-direct", value: buffedDirectDps })
  }

  if (buffedDotDps > 0) {
    entries.push({ metricId: "companion-dps-dot", value: buffedDotDps })
  }

  const buffedTotalDps = rotation.dps * totalDpsMultiplier
  const rawSingleTargetDps = rotation.singleTargetDamage / cycleDuration
  const buffedSingleTargetDps = rawSingleTargetDps * totalDpsMultiplier
  const targetCount = rotation.config.targetCount

  if (buffedTotalDps > 0) {
    entries.push({ metricId: "companion-dps-total", value: buffedTotalDps })
  }

  if (buffedSingleTargetDps > 0) {
    entries.push({ metricId: "companion-dps-single-target", value: buffedSingleTargetDps })
  }

  if (targetCount > 1 && buffedTotalDps > 0) {
    entries.push({ metricId: "companion-dps-aoe", value: buffedTotalDps / targetCount })
  }

  const directHps = rotation.directHealing / cycleDuration
  const hotHps = rotation.hotHealing / cycleDuration

  if (directHps > 0) {
    entries.push({ metricId: "companion-hps-direct", value: directHps })
  }

  if (hotHps > 0) {
    entries.push({ metricId: "companion-hps-hot", value: hotHps })
  }

  if (rotation.allySps > 0) {
    entries.push({ metricId: "companion-hps-shield", value: rotation.allySps })
  }

  const hpsTotal = rotation.allyHps + rotation.allySps
  if (hpsTotal > 0) {
    entries.push({ metricId: "companion-hps-total", value: hpsTotal })
  }

  if (rotation.selfSps > 0) {
    entries.push({ metricId: "companion-sps-self", value: rotation.selfSps })
  }

  if (rotation.allySps > 0) {
    entries.push({ metricId: "companion-sps-ally", value: rotation.allySps })
  }

  const spsTotal = rotation.selfSps + rotation.allySps
  if (spsTotal > 0) {
    entries.push({ metricId: "companion-sps-total", value: spsTotal })
  }

  return entries
}

export function computeTpsMetrics(
  rotation: RotationResult,
  metricValues: Map<CompanionMetricId, number>
): readonly RotationMetricEntry[] {
  const baseToughness = metricValues.get("companion-effective-toughness") ?? 0
  const healthMax = metricValues.get("companion-health-maximum") ?? 30000
  const damageTakenMod = metricValues.get("companion-damage-taken") ?? 0
  const damageTakenMult = 1 + damageTakenMod

  const baseArmor = metricValues.get("companion-armor") ?? 0
  const armorMetric = companionMetrics.data["companion-armor"]
  const armorDivisor = armorMetric.valueType === "rating" ? armorMetric.divisor : 50000
  const armorCap = armorMetric.valueType === "rating" ? armorMetric.cap : 1
  const baseMitigation = convertRatingToChance(baseArmor, armorDivisor, armorCap)

  let buffToughness = 0
  let shieldToughness = 0

  for (const summary of rotation.skillSummaries) {
    if (summary.uptime <= 0) continue
    if (summary.skillId === "light-attack") continue

    const skill = companionSkills.data[summary.skillId]
    if (!skill) continue

    const effects: readonly CompanionEffect[] = skill.effects
    for (const effect of effects) {
      if (effect.type === "apply-buff" && effect.buff) {
        const { buff, value } = effect.buff

        if (buff === "major-resolve" || buff === "minor-resolve") {
          const buffArmor = value ?? 0
          const buffedMitigation = convertRatingToChance(
            baseArmor + buffArmor,
            armorDivisor,
            armorCap
          )
          const incrementalMitigation = buffedMitigation - baseMitigation
          const armorContribution = (healthMax * incrementalMitigation) / damageTakenMult
          buffToughness += armorContribution * summary.uptime
        }

        if (buff === "flat-damage-reduction" && typeof value === "number") {
          buffToughness += baseToughness * value * summary.uptime
        }

        if (buff === "major-protection") {
          buffToughness += baseToughness * 0.1 * summary.uptime
        }
        if (buff === "minor-protection") {
          buffToughness += baseToughness * 0.05 * summary.uptime
        }
      }

      if (effect.type === "apply-debuff" && effect.debuff) {
        const { debuff } = effect.debuff

        if (debuff === "major-maim") {
          buffToughness += baseToughness * 0.1 * summary.uptime
        }
        if (debuff === "minor-maim") {
          buffToughness += baseToughness * 0.05 * summary.uptime
        }
      }

      if (effect.type === "shield" && effect.formula) {
        const shieldValue = evaluateShieldFormula(effect.formula, metricValues)
        shieldToughness += shieldValue * summary.uptime
      }
    }
  }

  const selfHps = rotation.selfHps ?? 0

  const tpsTotal = baseToughness + buffToughness + selfHps + shieldToughness

  return [
    { metricId: "companion-tps-buff", value: buffToughness },
    { metricId: "companion-tps-self-hps", value: selfHps },
    { metricId: "companion-tps-shield", value: shieldToughness },
    { metricId: "companion-tps-total", value: tpsTotal },
  ]
}

export function mergeRotationMetrics(
  entries: readonly RotationMetricEntry[],
  metrics: Partial<Record<CompanionMetricId, CompanionMetricValue>>,
  metricValues: Map<CompanionMetricId, number>
): undefined {
  for (const entry of entries) {
    metrics[entry.metricId] = {
      ...companionMetrics.data[entry.metricId],
      value: Math.round(entry.value),
    }
    metricValues.set(entry.metricId, entry.value)
  }
}
