import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const build = {
  id: "01a0685d-89aa-749c-b7bc-b0f638217233",
  type: "page-type/text-property",
  slug: "build",
  propertySlug: "build",
  definition: "a version's build",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    { decisionKind: "decision-kind/gap", statement: "This property is a relation to a build." },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character build and a companion build are named here alike.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
