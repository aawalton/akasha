import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const armorAll = {
  id: "01a0e10d-1b60-7620-95af-e4012ba069d1",
  type: "page-type/temper-browser-category",
  slug: "armor-all",
  title: "All",
  displayOrder: 1,
  parent: "temper-browser-category/armor",
} as const satisfies TemperBrowserCategory
