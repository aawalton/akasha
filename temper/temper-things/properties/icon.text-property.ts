import type { TextProperty } from "@akasha/pages-system/text-property"

export type Icon = string

export const icon = {
  id: "01a05fac-7584-7877-a778-efd8ee361ce1",
  pageTypeSlug: "text-property",
  slug: "icon",
  propertySlug: "icon",
  definition: "the icon a thing is shown with",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
