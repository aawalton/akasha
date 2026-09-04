import type { TextProperty } from "@akasha/pages-system/text-property"

export type Epoch = string

export const epoch = {
  id: "01a05fc4-7a91-7076-af1b-6ce3e35e4b9a",
  pageTypeSlug: "text-property",
  slug: "epoch",
  propertySlug: "epoch",
  definition: "the day a rotation is counted from",
  max: 10,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "gap",
      statement: "This property is a day rather than text.",
    },
  ],
} as const satisfies TextProperty
