import type { TextProperty } from "@akasha/pages/text-property"

export type ItemLevel = string

export const itemLevel = {
  id: "01a05fcc-41f3-75f3-b81e-993d8b24e369",
  pageTypeSlug: "text-property",
  slug: "item-level",
  propertySlug: "level",
  definition: "the character level an item is made for",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A level reading Scaled follows the character with the item.",
    },
  ],
} as const satisfies TextProperty
