import type { EffectValue } from "akasha/temper/catalog/companion/base-stat/properties/effect-value.number-property.types.ts"
import type { SourceEffectMetric } from "akasha/temper/player/character/source/temper-attribute/properties/source-effect-metric.relation-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperAttribute = TemperThing & {
  metric: SourceEffectMetric
  value: EffectValue
}
