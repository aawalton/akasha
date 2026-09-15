import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const alchemyEffects = {
  id: "01a05fd1-d435-7be6-b06d-cee7752f59c6",
  type: "page-type/text-property",
  slug: "alchemy-effects",
  propertySlug: "alchemy-effects",
  definition: "the four effects a reagent can lend what it is brewed into",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to a poison effect.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One list has every effect a reagent carries.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
