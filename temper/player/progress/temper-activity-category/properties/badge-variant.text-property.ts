import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const badgeVariant = {
  id: "01a05fc9-9a00-724c-8bd4-be27362863ab",
  type: "page-type/text-property",
  slug: "badge-variant",
  propertySlug: "badge-variant",
  definition: "a category's badge color",
  maxLength: 20,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
