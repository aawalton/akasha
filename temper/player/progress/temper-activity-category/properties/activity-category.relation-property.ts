import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const activityCategory = {
  id: "01a0e0d3-5e3e-79bf-bcad-2db1d5fad3d6",
  type: "page-type/relation-property",
  slug: "activity-category",
  propertySlug: "activity",
  definition: "the sort of thing to do that a game heading is shown under",
  targetPageType: "page-type/temper-activity-category",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A heading stating no activity is shown under the other activity.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subheading stating no activity is shown under the activity of its heading.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
