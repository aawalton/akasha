import type { TemperSpecializedItemType } from "akasha/temper/catalog/temper-specialized-item-type/temper-specialized-item-type.page-type.types.ts"

export const ingredientMeat = {
  id: "01a0e11d-738a-7909-9f03-0098ee13ba5b",
  type: "page-type/temper-specialized-item-type",
  slug: "ingredient-meat",
  title: "Meat Ingredient",
  esoSpecializedItemTypeNumber: 40,
} as const satisfies TemperSpecializedItemType
