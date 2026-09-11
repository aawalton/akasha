import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"
import type { BuffName } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/buff-name.text-property.types.ts"
import type { Duration } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/duration.number-property.types.ts"
import type { EffectValue } from "akasha/temper/catalog/things/properties/effect-value.number-property.types.ts"
import type { ValueType } from "akasha/temper/catalog/things/properties/value-type.text-property.types.ts"

export type EffectBuff = {
  buff?: BuffName
  duration?: Duration
  value?: EffectValue
  valueType?: ValueType
}

export const effectBuff = {
  id: "01a06196-037a-7895-82cf-ee84fd21570f",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "effect-buff",
  propertySlug: "buff",
  definition: "the helpful effect an effect grants, and how long it holds",
  properties: [
    { pageProperty: "text-property/buff-name", required: false, many: false },
    { pageProperty: "number-property/duration", required: false, many: false },
    { pageProperty: "number-property/effect-value", required: false, many: false },
    { pageProperty: "text-property/value-type", required: false, many: false },
  ],
} as const satisfies RecordProperty
