import { buffOrDebuff } from "@akasha/temper-formula-framework/buff-or-debuff-source"
import {
  type BuffOrDebuffEffect,
  type Effect,
  isBuffOrDebuffEffect,
  isMetricEffect,
  type MetricEffect,
} from "@akasha/temper-formula-framework/effect"
import { formatPercent } from "@akasha/temper-formula-framework/number-format"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { getMetricDisplayName, metrics } from "../metrics/metrics.module.code.ts"

function resolveMetricName(metricId: string): string {
  return metrics.has(metricId) ? getMetricDisplayName(metricId) : metricId
}

export function formatEffects(
  effects: readonly Effect[],
  options?: { withoutValues?: boolean }
): readonly string[] {
  if (effects.length === 0) {
    return []
  }

  const metricEffects: MetricEffect[] = []
  const buffDebuffEffects: BuffOrDebuffEffect[] = []

  for (const effect of effects) {
    if (isMetricEffect(effect)) {
      metricEffects.push(effect)
    } else if (isBuffOrDebuffEffect(effect)) {
      buffDebuffEffects.push(effect)
    }
  }

  if (options?.withoutValues) {
    const metricNames = new Set<string>()
    for (const effect of metricEffects) {
      metricNames.add(resolveMetricName(effect.metricId))
    }

    const buffDebuffNames = new Set<string>()
    for (const effect of buffDebuffEffects) {
      buffDebuffNames.add(getBuffDebuffName(effect))
    }

    return [...metricNames, ...buffDebuffNames]
  }

  const formattedMetricEffects = formatMetricEffectsInternal(metricEffects)

  const formattedBuffDebuffEffects = buffDebuffEffects.map((effect) => {
    const name = getBuffDebuffName(effect)
    if (effect.seconds === undefined) {
      return name
    }
    return `${name} (${effect.seconds}s)`
  })

  return [...formattedMetricEffects, ...formattedBuffDebuffEffects]
}

function getBuffDebuffName(effect: BuffOrDebuffEffect): string {
  const id = "buffId" in effect ? effect.buffId : effect.debuffId
  return buffOrDebuff.has(id) ? buffOrDebuff.data[id].name : id
}

function formatMetricEffectsInternal(effects: readonly MetricEffect[]): readonly string[] {
  if (effects.length === 0) {
    return []
  }

  type AggregatableEffect = MetricEffect & {
    effectType: "integer" | "fractional-change"
    effectValue: number
  }
  const aggregatableEffects: AggregatableEffect[] = []
  const nonAggregatableEffects: MetricEffect[] = []

  for (const effect of effects) {
    if (effect.effectType === "integer" || effect.effectType === "fractional-change") {
      aggregatableEffects.push(effect)
    } else {
      nonAggregatableEffects.push(effect)
    }
  }

  const aggregatedMap = new Map<
    string,
    { metricId: string; value: number; effectType: "integer" | "fractional-change" }
  >()

  for (const effect of aggregatableEffects) {
    const key = `${effect.metricId}|${effect.effectType}`
    const existing = aggregatedMap.get(key)

    if (existing) {
      existing.value += effect.effectValue
    } else {
      aggregatedMap.set(key, {
        metricId: effect.metricId,
        value: effect.effectValue,
        effectType: effect.effectType,
      })
    }
  }

  const formattedAggregated: string[] = []
  for (const [, { metricId, value, effectType }] of aggregatedMap.entries()) {
    const name = resolveMetricName(metricId)
    const formattedValue = formatMetricEffectValue({
      metricId,
      effectType,
      effectValue: value,
    })
    formattedAggregated.push(`${formattedValue} ${name}`)
  }

  const formattedNonAggregated = nonAggregatableEffects.map((effect) => {
    const name = resolveMetricName(effect.metricId)
    const formattedValue = formatMetricEffectValue(effect)
    return `${formattedValue} ${name}`
  })

  return [...formattedAggregated, ...formattedNonAggregated]
}

function formatMetricEffectValue(effect: MetricEffect): string {
  switch (effect.effectType) {
    case "fractional-change": {
      return formatPercent(effect.effectValue)
    }
    case "integer":
    case "number": {
      return effect.effectValue.toString()
    }
    case "number-per-seconds":
    case "number-for-seconds": {
      return effect.effectValue.value.toString()
    }
    case "fractional-change-for-seconds": {
      return formatPercent(effect.effectValue.value)
    }
    case "conditional-chance": {
      return `${(effect.effectValue.chance * 100).toFixed(1)}% chance for ${effect.effectValue.value}`
    }
    default:
      assertNever(effect)
  }
}
