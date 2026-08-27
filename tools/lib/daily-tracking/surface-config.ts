import type { PageEntitySurfaceConfig } from "./tracking-types.ts"

export const FOOD_SURFACE_CONFIG: PageEntitySurfaceConfig = {
  slug: "food-entry",
  columns: ["seq", "happenedAt", "plantGrams", "estimatedCalories", "title"],
}
