import type { TemperCompanionThing } from "akasha/temper/catalog/temper-companion/thing/temper-companion-thing.page-type.types.ts"
import type { IsReduction } from "akasha/temper/catalog/temper-companion/trait/properties/is-reduction.boolean-property.types.ts"
import type { MetricId } from "akasha/temper/catalog/temper-companion/trait/properties/metric-id.text-property.types.ts"
import type { TraitEffectType } from "akasha/temper/catalog/temper-companion/trait/properties/trait-effect-type.text-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperCompanionTrait = TemperCompanionThing & {
  key: Key
  metricId?: MetricId
  effectType?: TraitEffectType
  isReduction: IsReduction
}
