import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const armorClothing = {
  id: "01a0e10d-1b60-7683-95e7-c89beec908c1",
  type: "page-type/temper-browser-category",
  slug: "armor-clothing",
  title: "Clothing",
  displayOrder: 5,
  parent: "temper-browser-category/armor",
} as const satisfies TemperBrowserCategory
