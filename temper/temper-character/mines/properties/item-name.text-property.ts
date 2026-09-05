import type { TextProperty } from "@akasha/pages/text-property"

export type ItemName = string

export const itemName = {
  id: "01a06553-ace7-70af-be45-b007740978fa",
  pageTypeSlug: "text-property",
  slug: "item-name",
  propertySlug: "name",
  definition: "what a sweep read an item's name as",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name is the text one sweep read where a title is the item's name now.",
    },
    {
      invariantKind: "departure",
      statement: "A name and a title part where a sweep read the item before the item was renamed.",
    },
  ],
} as const satisfies TextProperty
