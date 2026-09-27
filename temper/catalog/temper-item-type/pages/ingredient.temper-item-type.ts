import type { TemperItemType } from "akasha/temper/catalog/temper-item-type/temper-item-type.page-type.types.ts"

export const ingredient = {
  id: "01a0e10a-1c75-7e0f-8be5-23333652c474",
  type: "page-type/temper-item-type",
  slug: "ingredient",
  title: "Ingredient",
  esoItemTypeNumber: 10,
} as const satisfies TemperItemType
