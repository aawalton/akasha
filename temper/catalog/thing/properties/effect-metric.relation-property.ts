import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const effectMetric = {
  id: "01a0d3fb-ee3d-7a22-b414-2c3736bcc96a",
  type: "page-type/relation-property",
  slug: "effect-metric",
  propertySlug: "metric-id",
  definition: "the metric an effect moves",
  targetPageType: "page-type/temper-metric-tree",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The key is the one every reader of an effect spells.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An effect names a node of type `metric` rather than a category.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
