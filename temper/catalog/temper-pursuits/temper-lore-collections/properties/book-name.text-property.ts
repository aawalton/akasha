import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type BookName = string

export const bookName = {
  id: "01a06343-f9f7-7003-a0d9-1c128c00db86",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "book-name",
  propertySlug: "book-name",
  definition: "the name a lore book is shown under",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
