import type { TemperSourceCategory } from "akasha/temper/catalog/world/temper-source-category/temper-source-category.page-type.types.ts"

export const foodDrink = {
  id: "019e3104-cc05-797d-8466-34b79f331c11",
  type: "page-type/temper-source-category",
  slug: "food-drink",
  title: "Food / Drink",
  displayOrder: 7,
  key: "food-or-drink",
} as const satisfies TemperSourceCategory
