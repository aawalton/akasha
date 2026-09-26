import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const sourceEffects = {
  id: "01a0df56-c3db-7e0d-9336-655bfce43dde",
  type: "page-type/record-property",
  slug: "source-effects",
  propertySlug: "effects",
  definition: "what an effect source does, one stat moved by one amount to an entry",
  properties: [
    { pageProperty: "relation-property/source-effect-metric", required: true, many: false },
    { pageProperty: "text-property/metric-effect-type", required: true, many: false },
    { pageProperty: "number-property/effect-value", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry names a stat rather than a node of the stat tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A source's entries keep the order the source states them in.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
