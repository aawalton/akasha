import type { TemperSpecializedItemType } from "akasha/temper/catalog/temper-specialized-item-type/temper-specialized-item-type.page-type.types.ts"

export const foodGourmet = {
  id: "01a0e11d-738a-7f8a-8e78-a6cb21af8b20",
  type: "page-type/temper-specialized-item-type",
  slug: "food-gourmet",
  title: "Gourmet Dish",
  esoSpecializedItemTypeNumber: 7,
} as const satisfies TemperSpecializedItemType
