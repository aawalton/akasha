import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const companionShield = {
  id: "01a0e10d-1b60-7f1f-a9e1-07bbeae6b18d",
  type: "page-type/temper-browser-category",
  slug: "companion-shield",
  title: "Shield",
  displayOrder: 5,
  parent: "temper-browser-category/companion",
} as const satisfies TemperBrowserCategory
