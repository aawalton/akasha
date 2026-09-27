import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const consumablesCrownItem = {
  id: "01a0e10d-1b60-76bf-9112-b378b3f72faf",
  type: "page-type/temper-browser-category",
  slug: "consumables-crown-item",
  title: "Crown Item",
  displayOrder: 11,
  match: "Consumable",
  itemTypes: ["temper-item-type/crown-item"],
  parent: "temper-browser-category/consumables",
} as const satisfies TemperBrowserCategory
