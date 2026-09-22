import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const companionId = {
  id: "01a05fba-ce39-74ad-926f-d6a5d9908dfc",
  type: "page-type/relation-property",
  slug: "companion-id",
  propertySlug: "companion-id",
  definition: "the companion a page is about",
  targetPageType: "page-type/temper-eso-companion",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page no one companion is about names no companion.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
