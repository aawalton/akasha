import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const companionArmor = {
  id: "01a0e10d-1b60-7503-8236-bc308da6f342",
  type: "page-type/temper-browser-category",
  slug: "companion-armor",
  title: "Armor",
  displayOrder: 3,
  parent: "temper-browser-category/companion",
} as const satisfies TemperBrowserCategory
