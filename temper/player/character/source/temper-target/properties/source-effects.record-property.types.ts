import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { EffectValue } from "akasha/temper/catalog/companion/base-stat/properties/effect-value.number-property.types.ts"
import type { SourceEffectMetric } from "akasha/temper/player/character/source/temper-attribute/properties/source-effect-metric.relation-property.types.ts"
import type { MetricEffectType } from "akasha/temper/player/character/stat/temper-metric/properties/metric-effect-type.text-property.types.ts"

export type SourceEffects = List<{
  metric: SourceEffectMetric
  effectType: MetricEffectType
  value: EffectValue
}>
