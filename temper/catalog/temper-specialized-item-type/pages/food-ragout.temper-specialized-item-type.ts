import type { TemperSpecializedItemType } from "akasha/temper/catalog/temper-specialized-item-type/temper-specialized-item-type.page-type.types.ts"

export const foodRagout = {
  id: "01a0e11d-738a-7e5a-aef1-281dfca4cb60",
  type: "page-type/temper-specialized-item-type",
  slug: "food-ragout",
  title: "Ragout Dish",
  esoSpecializedItemTypeNumber: 5,
} as const satisfies TemperSpecializedItemType
