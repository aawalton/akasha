import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const armorLight = {
  id: "01a0e10d-1b60-7a2b-8873-048745e18e5c",
  type: "page-type/temper-browser-category",
  slug: "armor-light",
  title: "Light",
  displayOrder: 4,
  parent: "temper-browser-category/armor",
} as const satisfies TemperBrowserCategory
