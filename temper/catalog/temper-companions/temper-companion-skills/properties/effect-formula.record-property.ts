import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"

export const effectFormula = {
  id: "01a06196-0379-794b-ab04-2e9ba72de0d9",
  type: "record-property",
  slug: "effect-formula",
  propertySlug: "formula",
  definition: "how an effect works out the number it has",
  properties: [
    { pageProperty: "text-property/formula-kind", required: false, many: false },
    { pageProperty: "text-property/metric-id", required: false, many: false },
    { pageProperty: "number-property/coefficient", required: false, many: false },
    { pageProperty: "text-property/coefficient-type", required: false, many: false },
    { pageProperty: "number-property/formula-percent", required: false, many: false },
  ],
  types: "ts",
} as const satisfies RecordProperty
