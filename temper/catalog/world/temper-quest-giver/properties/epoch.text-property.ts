import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const epoch = {
  id: "01a05fc4-7a91-7076-af1b-6ce3e35e4b9a",
  type: "page-type/text-property",
  slug: "epoch",
  propertySlug: "epoch",
  definition: "the day a rotation's count begins",
  maxLength: 10,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a day rather than text.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
