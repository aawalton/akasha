import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const setBonuses = {
  id: "01a05fcd-f554-73bf-83df-72e8cb8357e3",
  type: "page-type/record-property",
  slug: "set-bonuses",
  propertySlug: "set-bonuses",
  definition: "what a set gives at each number of pieces worn",
  properties: [
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "boolean-property/is-perfected", required: true, many: false },
    { pageProperty: "number-property/num-required", required: true, many: false },
  ],
  types: "ts",
  createdAt: "2026-09-02T01:48:48.340Z",
  updatedAt: "2026-09-21T15:29:06.000Z",
} as const satisfies RecordProperty
