import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const skillType = {
  id: "01a05fba-ce3b-7869-b428-d3dd2f8703d7",
  type: "page-type/text-property",
  slug: "skill-type",
  propertySlug: "skill-type",
  definition: "the sort of skill a page is about",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to  a skill type.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
