import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type FurnitureCategoryIds = number

export const furnitureCategoryIds = {
  id: "01a05fcb-fd30-7ce6-b610-ae29822cdd4d",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "furniture-category-ids",
  propertySlug: "furniture-category-ids",
  definition: "a furniture category The Elder Scrolls Online numbers",
  max: null,
} as const satisfies NumberProperty
