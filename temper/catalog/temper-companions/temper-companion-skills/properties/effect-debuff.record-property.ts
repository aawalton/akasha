import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"
import type { DebuffName } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/debuff-name.text-property.types.ts"
import type { Duration } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/duration.number-property.types.ts"
import type { EffectValue } from "akasha/temper/catalog/things/properties/effect-value.number-property.types.ts"
import type { ValueType } from "akasha/temper/catalog/things/properties/value-type.text-property.types.ts"

export type EffectDebuff = {
  debuff?: DebuffName
  duration?: Duration
  value?: EffectValue
  valueType?: ValueType
}

export const effectDebuff = {
  id: "01a06196-037a-7e14-80f7-0ae4cc1593d4",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "effect-debuff",
  propertySlug: "debuff",
  definition: "the harmful effect an effect lays on, and how long it holds",
  properties: [
    { pageProperty: "text-property/debuff-name", required: false, many: false },
    { pageProperty: "number-property/duration", required: false, many: false },
    { pageProperty: "number-property/effect-value", required: false, many: false },
    { pageProperty: "text-property/value-type", required: false, many: false },
  ],
} as const satisfies RecordProperty
