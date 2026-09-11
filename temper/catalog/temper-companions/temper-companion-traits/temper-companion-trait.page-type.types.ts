import type { Key } from "../../../things/properties/key.text-property.ts"
import type { MetricId } from "../../things/properties/metric-id.text-property.types.ts"
import type { IsReduction } from "../temper-companion-things/properties/is-reduction.boolean-property.types.ts"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.types.ts"
import type { TraitEffectType } from "./properties/trait-effect-type.text-property.types.ts"

export type TemperCompanionTrait = TemperCompanionThing & {
  key: Key
  metricId?: MetricId
  effectType?: TraitEffectType
  isReduction: IsReduction
}
