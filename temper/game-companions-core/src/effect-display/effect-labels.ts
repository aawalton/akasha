import type {
  SpecialEffectType,
  StatusEffectType,
} from "@akasha/temper-skill-kinds/skill-activation-effect-types"
import type {
  ActivationBuffType,
  ActivationDebuffType,
} from "@akasha/temper-skill-kinds/skill-buff-debuff-types"
import { specialEffectTypes } from "@akasha/temper-skill-kinds/special-effect-types"
import { statusEffectTypes } from "@akasha/temper-skill-kinds/status-effect-types"
import { buffOrDebuff } from "@akasha/temper-formula-framework/buff-or-debuff-source"
import { companionActivationBuffs } from "../generated/temper-companion-activation-buff.generated"
import type { CompanionMetricId } from "@akasha/temper-companions-core/companion-metric-ids"
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
