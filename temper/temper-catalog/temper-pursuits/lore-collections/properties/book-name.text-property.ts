import type { TextProperty } from "@akasha/pages-system/text-property"

export type BookName = string

export const bookName = {
  id: "01a06343-f9f7-7003-a0d9-1c128c00db86",
  pageTypeSlug: "text-property",
  slug: "book-name",
  propertySlug: "book-name",
  definition: "the name a lore book is shown under",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
