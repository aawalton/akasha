import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const skillLineId = {
  id: "01a05fba-ce3b-7214-b302-f798be22e99e",
  type: "page-type/text-property",
  slug: "skill-line-id",
  propertySlug: "skill-line-id",
  definition: "the line a skill belongs to",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to a skill line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion skill names its line through a relation of its own instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page carrying this value decides which of the two this value reaches.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Four kinds of weapon name a line that is no page.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
