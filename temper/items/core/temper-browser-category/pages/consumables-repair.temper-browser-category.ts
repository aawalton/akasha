import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const consumablesRepair = {
  id: "01a0e10d-1b61-7724-8980-2677b0cec46b",
  type: "page-type/temper-browser-category",
  slug: "consumables-repair",
  title: "Repair",
  displayOrder: 10,
  match: "Consumable",
  itemTypes: [
    "temper-item-type/tool",
    "temper-item-type/ava-repair",
    "temper-item-type/crown-repair",
    "temper-item-type/group-repair",
  ],
  parent: "temper-browser-category/consumables",
  createdAt: "2026-09-27T04:08:47.713Z",
  updatedAt: "2026-09-27T04:34:39.000Z",
} as const satisfies TemperBrowserCategory
