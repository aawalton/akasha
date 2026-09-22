import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const subcategoryId = {
  id: "01a05fba-ce3b-7c4b-adf4-7b752fef3058",
  type: "page-type/text-property",
  slug: "subcategory-id",
  propertySlug: "subcategory-id",
  definition: "a thing's narrower group",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to a subcategory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page type carrying this value decides the page type this value reaches.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A set names its class group by that page's key rather than by that page's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill states its line once, so a skill states no group of its own.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
