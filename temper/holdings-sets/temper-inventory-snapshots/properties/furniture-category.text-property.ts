import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type FurnitureCategory = string

export const furnitureCategory = {
  id: "01a06053-b37e-76df-9f89-11a83d5fd1e0",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "furniture-category",
  propertySlug: "furniture-category",
  definition: "the room a furnishing is filed under",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
