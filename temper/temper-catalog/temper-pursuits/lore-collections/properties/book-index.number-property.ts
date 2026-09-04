import type { NumberProperty } from "@akasha/pages-system/number-property"

export type BookIndex = number

export const bookIndex = {
  id: "01a06343-f9f7-7002-a25f-de87fee16ab6",
  pageTypeSlug: "number-property",
  slug: "book-index",
  propertySlug: "book-index",
  definition: "the number the game orders a book by inside its collection",
  max: null,
} as const satisfies NumberProperty
