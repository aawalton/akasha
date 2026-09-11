import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"

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
  types: "ts",
} as const satisfies RecordProperty
