import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const parent = {
  id: "01a05fba-ce39-70e6-a46f-4b11e5d2a508",
  type: "page-type/text-property",
  slug: "parent",
  propertySlug: "parent",
  definition: "the page a page hangs beneath",
  maxLength: 200,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to the page above.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Five of the six trees naming a page above name a page of their own page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A research line names a craft rather than another research line.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Nine names reach a page in two of those trees, so the tree decides which page.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
