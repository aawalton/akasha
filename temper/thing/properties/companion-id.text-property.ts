import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const companionId = {
  id: "01a05fba-ce39-74ad-926f-d6a5d9908dfc",
  type: "page-type/text-property",
  slug: "companion-id",
  propertySlug: "companion-id",
  definition: "the companion a page is about",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to a companion.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page every companion shares names them all at once rather than one of them.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The name meaning all of them is no companion's page.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
