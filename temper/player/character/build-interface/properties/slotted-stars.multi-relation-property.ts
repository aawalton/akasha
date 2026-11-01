import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const slottedStars = {
  id: "01a1989e-af97-77d8-84f4-eb43ba459187",
  type: "page-type/multi-relation-property",
  slug: "slotted-stars",
  propertySlug: "slotted-stars",
  definition: "the champion stars a build interface slots",
  targetPageType: "page-type/temper-champion-star",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A star a build slots itself takes the slot before a star its interface slots.",
    },
  ],
  types: "ts",
  createdAt: "2026-11-01T19:38:18.901Z",
  updatedAt: "2026-11-01T19:38:18.901Z",
} as const satisfies MultiRelationProperty
