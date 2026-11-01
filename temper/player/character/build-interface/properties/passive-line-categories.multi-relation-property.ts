import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const passiveLineCategories = {
  id: "01a1989e-af97-77ca-ace6-d6f4dd1a3b34",
  type: "page-type/multi-relation-property",
  slug: "passive-line-categories",
  propertySlug: "passive-line-categories",
  definition:
    "the kinds of skill line whose every passive a build interface holds, among the lines a build has",
  targetPageType: "page-type/temper-skill-line-category",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A build has the racial line of its race and the class lines it names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build has the line of every weapon on either of its bars.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build has the line of every armor weight it wears a piece of.",
    },
  ],
  types: "ts",
  createdAt: "2026-11-01T19:38:18.901Z",
  updatedAt: "2026-11-01T19:38:18.901Z",
} as const satisfies MultiRelationProperty
