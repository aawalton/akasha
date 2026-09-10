import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"
import type { BuffId } from "../../things/properties/buff-id.text-property.ts"
import type { EffectType } from "../../things/properties/effect-type.text-property.ts"
import type { EffectValue } from "../../things/properties/effect-value.number-property.types.ts"
import type { MetricId } from "../../things/properties/metric-id.text-property.ts"

export type BonusEffect = {
  metricId?: MetricId
  type?: EffectType
  value?: EffectValue
  buffId?: BuffId
}

export type BonusEffects = List<BonusEffect>

export const bonusEffects = {
  id: "01a05fd1-d436-73c6-b34e-3d504facf23f",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "bonus-effects",
  propertySlug: "effects",
  definition: "what one set bonus does, a metric or a buff to an entry",
  properties: [
    { pageProperty: "text-property/metric-id", required: false, many: false },
    { pageProperty: "text-property/effect-type", required: false, many: false },
    { pageProperty: "number-property/effect-value", required: false, many: false },
    { pageProperty: "text-property/buff-id", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An entry naming a metric names no buff.",
    },
    {
      invariantKind: "departure",
      statement: "An entry naming a metric also has an effect type and an effect value.",
    },
  ],
} as const satisfies RecordProperty
