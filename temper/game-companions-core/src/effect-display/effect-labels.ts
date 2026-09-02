import type {
  SpecialEffectType,
  StatusEffectType,
} from "@temper/game-characters-skills/skill-activation-effect-types"
import type {
  ActivationBuffType,
  ActivationDebuffType,
} from "@temper/game-characters-skills/skill-buff-debuff-types"
import { specialEffectTypes } from "@temper/game-characters-skills/special-effect-type-data"
import { statusEffectTypes } from "@temper/game-characters-skills/status-effect-type-data"
import { buffOrDebuff } from "@akasha/temper-formula-framework/buff-or-debuff-source"
import { companionActivationBuffs } from "../generated/temper-companion-activation-buff.generated"
import type { CompanionMetricId } from "../stats/companion-metric-ids.generated"
import { companionPassiveMetrics } from "../stats/companion-passive-metric-data"

const buffOrDebuffByName: Readonly<Record<string, { name: string }>> = buffOrDebuff.data

export function formatBuffType(buff: ActivationBuffType): string {
  const entry = buffOrDebuffByName[buff]
  if (entry) return entry.name
  if (companionActivationBuffs.has(buff)) {
    return companionActivationBuffs.data[buff].name
  }
  return buff
}

export function formatDebuffType(debuff: ActivationDebuffType): string {
  const entry = buffOrDebuffByName[debuff]
  if (entry) return entry.name
  if (companionActivationBuffs.has(debuff)) {
    return companionActivationBuffs.data[debuff].name
  }
  return debuff
}

export function formatStatusEffect(status: StatusEffectType): string {
  return statusEffectTypes.data[status].name
}

export function formatSpecialEffect(effect: SpecialEffectType): string {
  return specialEffectTypes.data[effect].name
}

export function formatPassiveMetric(metricId: CompanionMetricId): string {
  if (companionPassiveMetrics.has(metricId)) {
    return companionPassiveMetrics.data[metricId].name
  }
  return metricId
}
