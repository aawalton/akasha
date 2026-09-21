import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const priority = {
  id: "01a05fc6-81fd-7764-b99b-b35b9b100540",
  type: "page-type/text-property",
  slug: "priority",
  propertySlug: "priority",
  definition: "how soon a task is wanted against its siblings",
  maxLength: 4,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A priority is written `p` before its number.",
    },
    { decisionKind: "decision-kind/departure", statement: "A lower number is wanted sooner." },
  ],
  types: "ts",
} as const satisfies TextProperty
