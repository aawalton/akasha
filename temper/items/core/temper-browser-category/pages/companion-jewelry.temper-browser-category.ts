import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const companionJewelry = {
  id: "01a0e10d-1b60-7f0d-9e83-637e9ace60a5",
  type: "page-type/temper-browser-category",
  slug: "companion-jewelry",
  title: "Jewelry",
  displayOrder: 4,
  parent: "temper-browser-category/companion",
} as const satisfies TemperBrowserCategory
