import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const weaponsBow = {
  id: "01a0e10d-1b61-782a-bfe8-a68ffe96b935",
  type: "page-type/temper-browser-category",
  slug: "weapons-bow",
  title: "Bow",
  displayOrder: 4,
  parent: "temper-browser-category/weapons",
} as const satisfies TemperBrowserCategory
