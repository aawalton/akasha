import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const armorMedium = {
  id: "01a0e10d-1b60-7dcb-9187-f2af38b7fb4f",
  type: "page-type/temper-browser-category",
  slug: "armor-medium",
  title: "Medium",
  displayOrder: 3,
  parent: "temper-browser-category/armor",
} as const satisfies TemperBrowserCategory
