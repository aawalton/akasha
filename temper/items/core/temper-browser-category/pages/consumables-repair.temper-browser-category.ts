import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const consumablesRepair = {
  id: "01a0e10d-1b61-7724-8980-2677b0cec46b",
  type: "page-type/temper-browser-category",
  slug: "consumables-repair",
  title: "Repair",
  displayOrder: 10,
  parent: "temper-browser-category/consumables",
} as const satisfies TemperBrowserCategory
