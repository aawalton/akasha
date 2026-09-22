import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const category = {
  id: "01a05fba-ce38-7d43-8178-11d7822b6825",
  type: "page-type/text-property",
  slug: "category",
  propertySlug: "category",
  definition: "the sort of thing a page is about",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page type carrying this value declares it rather than inheriting it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page type carrying this value decides what the groups named here are.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
