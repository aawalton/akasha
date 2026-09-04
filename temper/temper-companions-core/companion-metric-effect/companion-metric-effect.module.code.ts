import type { CompanionMetricId } from "../companion-metric-ids/companion-metric-ids.module.code.ts"

type CompanionMetricEffectBase = {
  metricId: CompanionMetricId
}

export type CompanionMetricEffect =
  | (CompanionMetricEffectBase & { effectType: "integer"; effectValue: number })
  | (CompanionMetricEffectBase & { effectType: "fractional-change"; effectValue: number })

export type CompanionEffect = CompanionMetricEffect
