import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const buildHash = {
  id: "01a0685d-89aa-782d-959a-2f5cebb21882",
  type: "page-type/text-property",
  slug: "build-hash",
  propertySlug: "build-hash",
  definition: "the arrangement a version holds, written as a string",
  maxLength: 4000,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Two versions arranged alike have one hash.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A hash runs longer than a name is allowed to run.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
