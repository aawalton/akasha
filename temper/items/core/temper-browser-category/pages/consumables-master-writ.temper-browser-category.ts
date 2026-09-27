import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const consumablesMasterWrit = {
  id: "01a0e10d-1b60-7d00-805c-0148425148c6",
  type: "page-type/temper-browser-category",
  slug: "consumables-master-writ",
  title: "Master Writ",
  displayOrder: 8,
  parent: "temper-browser-category/consumables",
} as const satisfies TemperBrowserCategory
