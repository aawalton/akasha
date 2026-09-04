import type { List } from "@akasha/pages-system/page-property"
import type { RecordProperty } from "@akasha/pages-system/record-property"
import type { BuffId } from "../../temper-catalog-things/properties/buff-id.text-property.ts"
import type { EffectType } from "../../temper-catalog-things/properties/effect-type.text-property.ts"
import type { EffectValue } from "../../temper-catalog-things/properties/effect-value.number-property.ts"
import type { MetricId } from "../../temper-catalog-things/properties/metric-id.text-property.ts"

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
  slug: "bonus-effects",
  propertySlug: "effects",
  definition: "what one set bonus does, a metric or a buff to an entry",
  properties: [
    { pagePropertySlug: "metric-id", required: false, many: false },
    { pagePropertySlug: "effect-type", required: false, many: false },
    { pagePropertySlug: "effect-value", required: false, many: false },
    { pagePropertySlug: "buff-id", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An entry naming a metric names no buff.",
    },
    {
      invariantKind: "departure",
      statement: "An entry naming a metric also carries an effect type and an effect value.",
    },
  ],
} as const satisfies RecordProperty
