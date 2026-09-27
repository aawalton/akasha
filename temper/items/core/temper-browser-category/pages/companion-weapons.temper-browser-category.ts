import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const companionWeapons = {
  id: "01a0e10d-1b60-7185-af64-d1b3d8380734",
  type: "page-type/temper-browser-category",
  slug: "companion-weapons",
  title: "Weapons",
  displayOrder: 2,
  parent: "temper-browser-category/companion",
} as const satisfies TemperBrowserCategory
