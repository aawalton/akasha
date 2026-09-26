import type { EffectValue } from "akasha/temper/catalog/companion/base-stat/properties/effect-value.number-property.types.ts"
import type { BaseStatMetric } from "akasha/temper/player/character/source/temper-base-stat/properties/base-stat-metric.relation-property.types.ts"
import type { MetricEffectType } from "akasha/temper/player/character/stat/temper-metric/properties/metric-effect-type.text-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperBaseStat = TemperThing & {
  metric: BaseStatMetric
  effectType: MetricEffectType
  value: EffectValue
}
