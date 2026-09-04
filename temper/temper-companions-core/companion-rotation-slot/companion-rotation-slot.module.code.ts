import type { CompanionMetricId } from "../companion-metric-ids/companion-metric-ids.module.code.ts"
import type { CompanionMetricValue } from "../companion-metrics/companion-metrics.module.code.ts"
import type { CompanionSkillTemplate } from "../companion-skill-activation-effect-types/companion-skill-activation-effect-types.module.code.ts"
import type { CompanionEffect } from "../companion-skill-effect-components/companion-skill-effect-components.module.code.ts"
import type { CompanionFormulaStats } from "../companion-skill-formula/companion-skill-formula.module.code.ts"
import {
  type CompanionSkillSlotId,
  companionSkillSlots,
} from "../companion-skill-slots/companion-skill-slots.module.code.ts"
import {
  type CompanionSkillId,
  companionSkills,
} from "../companion-skills/companion-skills.module.code.ts"
import type { SkillUsageSummary } from "../rotation-types/rotation-types.module.code.ts"

export interface SkillSlotData {
  slotId: CompanionSkillSlotId
  skillId: CompanionSkillId
  skill: CompanionSkillTemplate | undefined
  summary: SkillUsageSummary | undefined
  damage: number
  damagePercent: number
  dps: number
  dpc: number
  healing: number
  healingPercent: number
  sps: number
  spc: number
  hps: number
  hpc: number
  casts: number
  uptime: number
  tps: number
}

interface RotationTotals {
  totalDamage: number
  totalHealing: number
  totalCasts: number
  totalDps: number
  totalSps: number
  totalSpc: number
  totalHps: number
  totalDpc: number
  totalHpc: number
  totalTps: number
}

export function buildSlotData(
  summaries: readonly SkillUsageSummary[],
  cycleDuration: number,
  formulaStats: CompanionFormulaStats,
  metricStats: Partial<Record<CompanionMetricId, CompanionMetricValue>>,
  skillBar: Record<CompanionSkillSlotId, CompanionSkillId>
): readonly SkillSlotData[] {
  const summaryMap = new Map(summaries.map((s) => [s.skillId, s]))

  const totalDamage = summaries.reduce((sum, s) => sum + s.totalDamage, 0)
  const totalHealing = summaries.reduce((sum, s) => sum + s.totalHealing, 0)

  const baseToughness = metricStats["companion-effective-toughness"]?.value ?? 0
  const healthMax = metricStats["companion-health-maximum"]?.value ?? 30000
  const damageTakenMod = metricStats["companion-damage-taken"]?.value ?? 0
  const damageTakenMult = 1 + damageTakenMod

  return companionSkillSlots.ids.map((slotId) => {
    const skillId = skillBar[slotId]
    const skill = skillId !== "no-skill" ? companionSkills.data[skillId] : undefined
    const summary = skill ? summaryMap.get(skillId) : undefined

    const damage = summary?.totalDamage ?? 0
    const healing = summary?.totalHealing ?? 0
    const casts = summary?.usageCount ?? 0
    const uptime = summary?.uptime ?? 0

    const damagePercent = totalDamage > 0 ? (damage / totalDamage) * 100 : 0
    const healingPercent = totalHealing > 0 ? (healing / totalHealing) * 100 : 0
    const dps = cycleDuration > 0 ? Math.round(damage / cycleDuration) : 0
    const hps = cycleDuration > 0 ? Math.round(healing / cycleDuration) : 0
    const dpc = casts > 0 ? Math.round(damage / casts) : 0
    const hpc = casts > 0 ? Math.round(healing / casts) : 0

    let tps = 0
    let shielding = 0
    if (skill && uptime > 0) {
      const effects: readonly CompanionEffect[] = skill.effects
      for (const effect of effects) {
        if (effect.type === "apply-buff" && effect.buff) {
          const { buff, value } = effect.buff

          if (buff === "major-resolve" || buff === "minor-resolve") {
            const armorContribution = (healthMax * ((value ?? 0) / 50000)) / damageTakenMult
            tps += armorContribution * uptime
          }

          if (buff === "flat-damage-reduction" && typeof value === "number") {
            tps += baseToughness * value * uptime
          }

          if (buff === "major-protection") {
            tps += baseToughness * 0.1 * uptime
          }
          if (buff === "minor-protection") {
            tps += baseToughness * 0.05 * uptime
          }
        }

        if (effect.type === "apply-debuff" && effect.debuff) {
          const { debuff } = effect.debuff
          if (debuff === "major-maim") {
            tps += baseToughness * 0.1 * uptime
          }
          if (debuff === "minor-maim") {
            tps += baseToughness * 0.05 * uptime
          }
        }

        if (effect.type === "shield" && effect.formula) {
          const formula = effect.formula
          let shieldValue = 0
          if (formula.type === "metric-percent") {
            const metricValue =
              formula.metricId === "companion-weapon-damage"
                ? (formulaStats.metrics.get("companion-weapon-damage") ?? 2000)
                : (formulaStats.metrics.get("companion-health-maximum") ?? 30000)
            shieldValue = (formula.percent / 100) * metricValue
          } else if (formula.type === "metric-scaling" && formula.coefficient !== undefined) {
            const metricValue =
              formula.metricId === "companion-weapon-damage"
                ? (formulaStats.metrics.get("companion-weapon-damage") ?? 2000)
                : (formulaStats.metrics.get("companion-health-maximum") ?? 30000)
            shieldValue = formula.coefficient * metricValue
          } else if (formula.type === "player-health-percent" && formula.percent !== undefined) {
            shieldValue = (formula.percent / 100) * (formulaStats.playerMaxHealth ?? 25000)
          } else if (formula.type === "fixed" && formula.value !== undefined) {
            shieldValue = formula.value
          }
          shielding += shieldValue * casts
          tps += shieldValue * uptime
        }
      }
    }

    if (skill && healing > 0 && cycleDuration > 0) {
      const selfHealTargets = new Set(["self", "self-or-ally", "self-and-ally", "ground"])
      let selfHealCount = 0
      let totalHealCount = 0
      for (const effect of skill.effects) {
        if (
          (effect.type === "heal" || effect.type === "hot" || effect.type === "multi-heal") &&
          "target" in effect
        ) {
          totalHealCount++
          if (selfHealTargets.has(effect.target.type)) {
            selfHealCount++
          }
        }
      }
      if (totalHealCount > 0) {
        const selfFraction = selfHealCount / totalHealCount
        tps += (healing * selfFraction) / cycleDuration
      }
    }

    return {
      slotId,
      skillId,
      skill,
      summary,
      damage,
      damagePercent,
      dps,
      dpc,
      healing,
      healingPercent,
      sps: cycleDuration > 0 ? Math.round(shielding / cycleDuration) : 0,
      spc: casts > 0 ? Math.round(shielding / casts) : 0,
      hps,
      hpc,
      casts,
      uptime,
      tps: Math.round(tps),
    }
  })
}

export function computeRotationTotals(
  slotData: readonly SkillSlotData[],
  summaries: readonly SkillUsageSummary[],
  cycleDuration: number,
  metricStats: Partial<Record<CompanionMetricId, CompanionMetricValue>>
): RotationTotals {
  const totalDamage = summaries.reduce((sum, s) => sum + s.totalDamage, 0)
  const totalHealing = summaries.reduce((sum, s) => sum + s.totalHealing, 0)
  const totalCasts = summaries.reduce((sum, s) => sum + s.usageCount, 0)
  const totalDps = cycleDuration > 0 ? Math.round(totalDamage / cycleDuration) : 0
  const totalShielding = slotData.reduce((sum, d) => sum + d.sps * cycleDuration, 0)
  const totalSps = slotData.reduce((sum, d) => sum + d.sps, 0)
  const totalSpc = totalCasts > 0 ? Math.round(totalShielding / totalCasts) : 0
  const totalHps = cycleDuration > 0 ? Math.round(totalHealing / cycleDuration) : 0
  const totalDpc = totalCasts > 0 ? Math.round(totalDamage / totalCasts) : 0
  const totalHpc = totalCasts > 0 ? Math.round(totalHealing / totalCasts) : 0
  const totalTps = metricStats["companion-tps-total"]?.value ?? 0

  return {
    totalDamage,
    totalHealing,
    totalCasts,
    totalDps,
    totalSps,
    totalSpc,
    totalHps,
    totalDpc,
    totalHpc,
    totalTps,
  }
}
