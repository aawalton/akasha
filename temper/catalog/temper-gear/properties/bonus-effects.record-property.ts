import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"

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
  types: "ts",
} as const satisfies RecordProperty
