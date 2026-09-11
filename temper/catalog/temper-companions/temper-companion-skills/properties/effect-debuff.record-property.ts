import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"

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
  types: "ts",
} as const satisfies RecordProperty
