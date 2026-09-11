import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const bookIndex = {
  id: "01a06343-f9f7-7002-a25f-de87fee16ab6",
  type: "number-property",
  slug: "book-index",
  propertySlug: "book-index",
  definition: "the number the game orders a book by inside its collection",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
