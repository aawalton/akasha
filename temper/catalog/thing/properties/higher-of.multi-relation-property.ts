import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const higherOf = {
  id: "01a15725-b46b-75f4-9078-13b1f356b31f",
  type: "page-type/multi-relation-property",
  slug: "higher-of",
  propertySlug: "higher-of",
  definition: "the stats an effect lands on only the highest of",
  targetPageType: "page-type/temper-metric-tree",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An effect stating higher-of counts only where its own stat is the highest of the stats named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The stats named are compared as worked out with every higher-of effect left out.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "Where the stats named tie, the stat named first is the highest.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-20T02:30:51.243Z",
  updatedAt: "2026-10-20T02:30:51.243Z",
} as const satisfies MultiRelationProperty
