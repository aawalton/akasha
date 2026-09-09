import { buffOrDebuff } from "@akasha/temper-formula-framework/buff-or-debuff-source"
import type {
  SpecialEffectType,
  StatusEffectType,
} from "../../skill-kinds/skill-activation-effect-types/skill-activation-effect-types.module.code.ts"
import type {
  ActivationBuffType,
  ActivationDebuffType,
} from "../../skill-kinds/skill-buff-debuff-types/skill-buff-debuff-types.module.code.ts"
import { specialEffectTypes } from "../../skill-kinds/special-effect-types/special-effect-types.module.code.ts"
import { statusEffectTypes } from "../../skill-kinds/status-effect-types/status-effect-types.module.code.ts"
import { companionActivationBuffs } from "../companion-activation-buffs/companion-activation-buffs.module.code.ts"
import type { CompanionMetricId } from "../companion-metric-ids/companion-metric-ids.module.code.ts"
import { companionPassiveMetrics } from "../companion-passive-metrics/companion-passive-metrics.module.code.ts"

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
