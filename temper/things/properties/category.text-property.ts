import type { TextProperty } from "@akasha/pages/text-property"

export type Category = string

export const category = {
  id: "01a05fba-ce38-7d43-8178-11d7822b6825",
  pageTypeSlug: "text-property",
  slug: "category",
  propertySlug: "category",
  definition: "the sort of thing a page is about",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
