import type { TemperSpecializedItemType } from "akasha/temper/catalog/temper-specialized-item-type/temper-specialized-item-type.page-type.types.ts"

export const drinkLiqueur = {
  id: "01a0e11d-7389-731b-9ea6-9bac667fdb86",
  type: "page-type/temper-specialized-item-type",
  slug: "drink-liqueur",
  title: "Liqueur Beverage",
  esoSpecializedItemTypeNumber: 23,
} as const satisfies TemperSpecializedItemType
