import type { MetricId } from "../../../temper-catalog/things/properties/metric-id.text-property.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { IsReduction } from "../temper-companion-things/properties/is-reduction.boolean-property.ts"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.types.ts"
import type { TraitEffectType } from "./properties/trait-effect-type.text-property.ts"

export type TemperCompanionTrait = TemperCompanionThing & {
  key: Key
  metricId?: MetricId
  effectType?: TraitEffectType
  isReduction: IsReduction
}
