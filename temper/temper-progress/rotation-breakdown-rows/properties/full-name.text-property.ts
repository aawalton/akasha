import type { TextProperty } from "@akasha/pages-system/text-property"

export type FullName = string

export const fullName = {
  id: "01a05fc9-9a02-75b0-b2c1-f758a29efa80",
  pageTypeSlug: "text-property",
  slug: "full-name",
  propertySlug: "full-name",
  definition: "the name a row is shown under where there is room for it",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
