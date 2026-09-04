import type { TextProperty } from "@akasha/pages-system/text-property"

export type ItemLevel = string

export const itemLevel = {
  id: "01a05fcc-41f3-75f3-b81e-993d8b24e369",
  pageTypeSlug: "text-property",
  slug: "item-level",
  propertySlug: "level",
  definition: "the character level an item is made for",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A level reading Scaled follows whoever carries the item.",
    },
  ],
} as const satisfies TextProperty
