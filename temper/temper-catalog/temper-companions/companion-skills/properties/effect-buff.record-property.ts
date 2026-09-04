import type { RecordProperty } from "@akasha/pages-system/record-property"
import type { EffectValue } from "../../../temper-catalog-things/properties/effect-value.number-property.ts"
import type { ValueType } from "../../../temper-catalog-things/properties/value-type.text-property.ts"
import type { BuffName } from "./buff-name.text-property.ts"
import type { Duration } from "./duration.number-property.ts"

export type EffectBuff = {
  buff?: BuffName
  duration?: Duration
  value?: EffectValue
  valueType?: ValueType
}

export const effectBuff = {
  id: "01a06196-037a-7895-82cf-ee84fd21570f",
  pageTypeSlug: "record-property",
  slug: "effect-buff",
  propertySlug: "buff",
  definition: "the helpful effect an effect grants, and how long it holds",
  properties: [
    { pagePropertySlug: "buff-name", required: false, many: false },
    { pagePropertySlug: "duration", required: false, many: false },
    { pagePropertySlug: "effect-value", required: false, many: false },
    { pagePropertySlug: "value-type", required: false, many: false },
  ],
} as const satisfies RecordProperty
