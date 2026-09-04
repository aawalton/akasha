import type { TemperSourceCategory } from "../temper-source-category.page-type.ts"

export const foodDrink = {
  id: "019e3104-cc05-797d-8466-34b79f331c11",
  pageTypeSlug: "temper-source-category",
  slug: "food-drink",
  title: "Food / Drink",
  displayOrder: 7,
  categoryId: "food-or-drink",
} as const satisfies TemperSourceCategory
