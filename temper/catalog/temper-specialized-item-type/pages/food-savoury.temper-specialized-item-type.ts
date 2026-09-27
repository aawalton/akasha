import type { TemperSpecializedItemType } from "akasha/temper/catalog/temper-specialized-item-type/temper-specialized-item-type.page-type.types.ts"

export const foodSavoury = {
  id: "01a0e11d-738a-748a-8224-c311b056fe55",
  type: "page-type/temper-specialized-item-type",
  slug: "food-savoury",
  title: "Savoury Dish",
  esoSpecializedItemTypeNumber: 4,
} as const satisfies TemperSpecializedItemType
