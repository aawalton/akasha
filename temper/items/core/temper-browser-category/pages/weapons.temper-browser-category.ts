import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const weapons = {
  id: "01a0e10d-1b61-7cac-a03e-5872b839e164",
  type: "page-type/temper-browser-category",
  slug: "weapons",
  title: "Weapons",
  displayOrder: 2,
  match: "Weapons",
} as const satisfies TemperBrowserCategory
