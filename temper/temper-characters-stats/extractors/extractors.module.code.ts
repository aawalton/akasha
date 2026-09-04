import { isMetricEffect } from "@akasha/temper-formula-framework/effect"
import type { EffectSource } from "@akasha/temper-formula-framework/effect-source"
import type { MetricId } from "@akasha/temper-formula-framework/metric-id"

export function getAttributeEffects(
  metricId: MetricId | readonly MetricId[],
  sources: readonly EffectSource[]
): number {
  if (Array.isArray(metricId)) {
    return metricId.reduce((sum, id) => sum + getAttributeEffects(id, sources), 0)
  }

  const attributeSource = sources.find(
    (s) =>
      s.categoryId === "attributes" &&
      s.effects.filter(isMetricEffect).some((e) => e.metricId === metricId)
  )

  if (!attributeSource) {
    return 0
  }

  if (!("count" in attributeSource) || typeof attributeSource.count !== "number") {
    return 0
  }

  const effect = attributeSource.effects.filter(isMetricEffect).find((e) => e.metricId === metricId)

  if (!effect || !isMetricEffect(effect)) {
    return 0
  }

  if (effect.effectType !== "integer") {
    return 0
  }

  return effect.effectValue * attributeSource.count
}

export function getIntegerEffects(
  categoryId: string,
  metricId: MetricId | readonly MetricId[],
  sources: readonly EffectSource[]
): number {
  if (Array.isArray(metricId)) {
    return metricId.reduce((sum, id) => sum + getIntegerEffects(categoryId, id, sources), 0)
  }

  return sources
    .filter((s) => s.categoryId === categoryId)
    .flatMap((s) => s.effects.filter(isMetricEffect))
    .filter((e) => isMetricEffect(e) && e.metricId === metricId && e.effectType === "integer")
    .reduce((sum, e) => {
      if (!isMetricEffect(e) || e.effectType !== "integer") return sum
      return sum + e.effectValue
    }, 0)
}

export function getPercentageEffects(
  categoryId: string,
  metricId: MetricId | readonly MetricId[],
  sources: readonly EffectSource[]
): number {
  if (Array.isArray(metricId)) {
    return metricId.reduce((sum, id) => sum + getPercentageEffects(categoryId, id, sources), 0)
  }

  return sources
    .filter((s) => s.categoryId === categoryId)
    .flatMap((s) => s.effects.filter(isMetricEffect))
    .filter(
      (e) => isMetricEffect(e) && e.metricId === metricId && e.effectType === "fractional-change"
    )
    .reduce((sum, e) => {
      if (!isMetricEffect(e) || e.effectType !== "fractional-change") return sum
      return sum + e.effectValue
    }, 0)
}

export function getNumberPerSecondsEffects(
  categoryId: string,
  metricId: MetricId | readonly MetricId[],
  sources: readonly EffectSource[]
): number {
  if (Array.isArray(metricId)) {
    return metricId.reduce(
      (sum, id) => sum + getNumberPerSecondsEffects(categoryId, id, sources),
      0
    )
  }

  return sources
    .filter((s) => s.categoryId === categoryId)
    .flatMap((s) => s.effects.filter(isMetricEffect))
    .filter(
      (e) => isMetricEffect(e) && e.metricId === metricId && e.effectType === "number-per-seconds"
    )
    .reduce((sum, e) => {
      if (!isMetricEffect(e) || e.effectType !== "number-per-seconds") return sum
      return sum + e.effectValue.value / e.effectValue.seconds
    }, 0)
}

export function getIndividualPercentageEffects(
  categoryId: string,
  metricId: MetricId | readonly MetricId[],
  sources: readonly EffectSource[]
): readonly number[] {
  if (Array.isArray(metricId)) {
    return metricId.flatMap((id) => getIndividualPercentageEffects(categoryId, id, sources))
  }

  return sources
    .filter((s) => s.categoryId === categoryId)
    .flatMap((s) => s.effects.filter(isMetricEffect))
    .filter(
      (e) => isMetricEffect(e) && e.metricId === metricId && e.effectType === "fractional-change"
    )
    .map((e) => {
      if (!isMetricEffect(e) || e.effectType !== "fractional-change") return 0
      return e.effectValue
    })
    .filter((v) => v !== 0)
}

export function getIndividualIntegerEffects(
  categoryId: string,
  metricId: MetricId | readonly MetricId[],
  sources: readonly EffectSource[]
): readonly number[] {
  if (Array.isArray(metricId)) {
    return metricId.flatMap((id) => getIndividualIntegerEffects(categoryId, id, sources))
  }

  return sources
    .filter((s) => s.categoryId === categoryId)
    .flatMap((s) => s.effects.filter(isMetricEffect))
    .filter((e) => isMetricEffect(e) && e.metricId === metricId && e.effectType === "integer")
    .map((e) => {
      if (!isMetricEffect(e) || e.effectType !== "integer") return 0
      return e.effectValue
    })
    .filter((v) => v !== 0)
}

export function getConditionalChanceEffects(
  categoryId: string,
  metricId: MetricId | readonly MetricId[],
  sources: readonly EffectSource[]
): number {
  if (Array.isArray(metricId)) {
    return metricId.reduce(
      (sum, id) => sum + getConditionalChanceEffects(categoryId, id, sources),
      0
    )
  }

  return sources
    .filter((s) => s.categoryId === categoryId)
    .flatMap((s) => s.effects.filter(isMetricEffect))
    .filter(
      (e) => isMetricEffect(e) && e.metricId === metricId && e.effectType === "conditional-chance"
    )
    .reduce((sum, e) => {
      if (!isMetricEffect(e) || e.effectType !== "conditional-chance") return sum
      return sum + e.effectValue.chance * e.effectValue.value
    }, 0)
}
