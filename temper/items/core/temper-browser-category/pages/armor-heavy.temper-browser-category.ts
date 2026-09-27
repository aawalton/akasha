import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const armorHeavy = {
  id: "01a0e10d-1b60-7e73-9f2a-87db073aa308",
  type: "page-type/temper-browser-category",
  slug: "armor-heavy",
  title: "Heavy",
  displayOrder: 2,
  parent: "temper-browser-category/armor",
} as const satisfies TemperBrowserCategory
