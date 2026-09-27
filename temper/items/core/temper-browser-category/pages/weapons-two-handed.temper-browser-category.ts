import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const weaponsTwoHanded = {
  id: "01a0e10d-1b61-7cfc-89c1-d30ee285e872",
  type: "page-type/temper-browser-category",
  slug: "weapons-two-handed",
  title: "Two-Handed",
  displayOrder: 3,
  parent: "temper-browser-category/weapons",
} as const satisfies TemperBrowserCategory
