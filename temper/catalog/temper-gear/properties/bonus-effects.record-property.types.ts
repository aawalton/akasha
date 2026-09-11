import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"
import type { BuffId } from "akasha/temper/catalog/things/properties/buff-id.text-property.types.ts"
import type { EffectType } from "akasha/temper/catalog/things/properties/effect-type.text-property.types.ts"
import type { EffectValue } from "akasha/temper/catalog/things/properties/effect-value.number-property.types.ts"
import type { MetricId } from "akasha/temper/catalog/things/properties/metric-id.text-property.types.ts"

export type BonusEffects = List<{
  metricId?: MetricId
  type?: EffectType
  value?: EffectValue
  buffId?: BuffId
}>
