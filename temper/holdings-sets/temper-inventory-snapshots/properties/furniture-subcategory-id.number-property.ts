import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type FurnitureSubcategoryId = number

export const furnitureSubcategoryId = {
  id: "01a06053-b37e-76a2-b86a-9e08ca3de11c",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "furniture-subcategory-id",
  propertySlug: "furniture-subcategory-id",
  definition: "the number the game names a furnishing's shelf by",
  max: null,
} as const satisfies NumberProperty
