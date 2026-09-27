import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const jewelryAll = {
  id: "01a0e10d-1b61-70ad-beae-a983f41f6608",
  type: "page-type/temper-browser-category",
  slug: "jewelry-all",
  title: "All",
  displayOrder: 1,
  match: "Jewelry",
  equipTypes: ["temper-equip-type/ring", "temper-equip-type/neck"],
  parent: "temper-browser-category/jewelry",
} as const satisfies TemperBrowserCategory
