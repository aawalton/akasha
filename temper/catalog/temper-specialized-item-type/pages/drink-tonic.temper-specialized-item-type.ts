import type { TemperSpecializedItemType } from "akasha/temper/catalog/temper-specialized-item-type/temper-specialized-item-type.page-type.types.ts"

export const drinkTonic = {
  id: "01a0e11d-7389-7cd3-ae8e-6e5aed5b70e3",
  type: "page-type/temper-specialized-item-type",
  slug: "drink-tonic",
  title: "Tonic Beverage",
  esoSpecializedItemTypeNumber: 22,
} as const satisfies TemperSpecializedItemType
