import type { TextProperty } from "@akasha/pages-system/text-property"

export type BadgeVariant = string

export const badgeVariant = {
  id: "01a05fc9-9a00-724c-8bd4-be27362863ab",
  pageTypeSlug: "text-property",
  slug: "badge-variant",
  propertySlug: "badge-variant",
  definition: "the color a category is badged in",
  max: 20,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
