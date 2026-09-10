import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type FurnitureCategoryId = number

export const furnitureCategoryId = {
  id: "01a06053-b37d-7348-8354-9906a879b8f4",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "furniture-category-id",
  propertySlug: "furniture-category-id",
  definition: "the number the game names a furnishing's room by",
  max: null,
} as const satisfies NumberProperty
