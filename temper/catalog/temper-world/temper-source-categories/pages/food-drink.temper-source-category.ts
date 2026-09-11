import type { TemperSourceCategory } from "akasha/temper/catalog/temper-world/temper-source-categories/temper-source-category.page-type.types.ts"

export const foodDrink = {
  id: "019e3104-cc05-797d-8466-34b79f331c11",
  type: "temper-source-category",
  slug: "food-drink",
  title: "Food / Drink",
  displayOrder: 7,
  categoryId: "food-or-drink",
} as const satisfies TemperSourceCategory
