import type { TemperSpecializedItemType } from "akasha/temper/catalog/temper-specialized-item-type/temper-specialized-item-type.page-type.types.ts"

export const drinkTea = {
  id: "01a0e11d-7389-7632-a93a-9cc4f99b25aa",
  type: "page-type/temper-specialized-item-type",
  slug: "drink-tea",
  title: "Tea Beverage",
  esoSpecializedItemTypeNumber: 21,
} as const satisfies TemperSpecializedItemType
