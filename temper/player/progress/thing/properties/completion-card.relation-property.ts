import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const completionCard = {
  id: "01a0c688-9666-72c8-b20b-f6fc5fd64234",
  type: "page-type/relation-property",
  slug: "completion-card",
  propertySlug: "completion-card",
  definition: "the completion card a page counts toward",
  targetPageType: "page-type/temper-completion-category",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A card is the node of the completion tree a tab root hangs that card beneath.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game is handed the node's own name rather than the page's address.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
