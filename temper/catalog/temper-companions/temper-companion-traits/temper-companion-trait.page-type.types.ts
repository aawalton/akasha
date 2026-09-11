import type { IsReduction } from "akasha/temper/catalog/temper-companions/temper-companion-things/properties/is-reduction.boolean-property.types.ts"
import type { TemperCompanionThing } from "akasha/temper/catalog/temper-companions/temper-companion-things/temper-companion-thing.page-type.types.ts"
import type { TraitEffectType } from "akasha/temper/catalog/temper-companions/temper-companion-traits/properties/trait-effect-type.text-property.types.ts"
import type { MetricId } from "akasha/temper/catalog/things/properties/metric-id.text-property.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperCompanionTrait = TemperCompanionThing & {
  key: Key
  metricId?: MetricId
  effectType?: TraitEffectType
  isReduction: IsReduction
}
