import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const browserArmorWeights = {
  id: "01a0e11e-6893-7d52-a775-3117db421f55",
  type: "page-type/multi-relation-property",
  slug: "browser-armor-weights",
  propertySlug: "armor-weights",
  definition: "the armor weights an item browser category takes",
  targetPageType: "page-type/temper-armor-weight",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A category matching weapons takes a weight by the weapon number it states.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
