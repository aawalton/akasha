import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const metricTreeParent = {
  id: "01a0cade-0463-70a3-964b-14162e508635",
  type: "page-type/relation-property",
  slug: "metric-tree-parent",
  propertySlug: "parent",
  definition: "the node a node of the metric tree hangs beneath",
  targetPageType: "page-type/temper-metric-tree",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A node stating no node above it is a root of the tree.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
