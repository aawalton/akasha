import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"

export const effectConditions = {
  id: "01a06196-037c-761a-88dd-6339c805b996",
  type: "record-property",
  slug: "effect-conditions",
  propertySlug: "conditions",
  definition: "what must hold for an effect to count",
  properties: [
    { pageProperty: "text-property/condition-kind", required: false, many: false },
    { pageProperty: "number-property/health-below", required: false, many: false },
    { pageProperty: "text-property/target-type", required: false, many: false },
    { pageProperty: "number-property/min-distance", required: false, many: false },
    { pageProperty: "number-property/max-distance", required: false, many: false },
    { pageProperty: "boolean-property/is-casting", required: false, many: false },
    { pageProperty: "text-property/condition-weapon-type", required: false, many: false },
    { pageProperty: "text-property/enemy-types", required: false, many: true, maxCount: null },
  ],
  types: "ts",
} as const satisfies RecordProperty
