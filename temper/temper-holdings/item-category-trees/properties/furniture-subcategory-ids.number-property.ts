import type { NumberProperty } from "@akasha/pages-system/number-property"

export type FurnitureSubcategoryIds = number

export const furnitureSubcategoryIds = {
  id: "01a05fcb-fd30-7a8b-b269-8dd705fda4cf",
  pageTypeSlug: "number-property",
  slug: "furniture-subcategory-ids",
  propertySlug: "furniture-subcategory-ids",
  definition: "a furniture subcategory The Elder Scrolls Online numbers",
  max: null,
} as const satisfies NumberProperty
