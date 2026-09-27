import type { TemperSpecializedItemType } from "akasha/temper/catalog/temper-specialized-item-type/temper-specialized-item-type.page-type.types.ts"

export const drinkAlcoholic = {
  id: "01a0e11d-7389-73e3-880a-94e99b1cf171",
  type: "page-type/temper-specialized-item-type",
  slug: "drink-alcoholic",
  title: "Alcoholic Beverage",
  esoSpecializedItemTypeNumber: 20,
} as const satisfies TemperSpecializedItemType
