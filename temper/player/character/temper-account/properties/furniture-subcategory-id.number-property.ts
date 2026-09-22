import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const furnitureSubcategoryId = {
  id: "01a06053-b37e-76a2-b86a-9e08ca3de11c",
  type: "page-type/number-property",
  slug: "furniture-subcategory-id",
  propertySlug: "furniture-subcategory-id",
  definition: "the game's number for a furnishing's shelf",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
