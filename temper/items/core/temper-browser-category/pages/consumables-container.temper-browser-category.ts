import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const consumablesContainer = {
  id: "01a0e10d-1b60-7b3e-beaf-9f33fb6340e4",
  type: "page-type/temper-browser-category",
  slug: "consumables-container",
  title: "Container",
  displayOrder: 9,
  match: "Consumable",
  itemTypes: [
    "temper-item-type/container",
    "temper-item-type/container-currency",
    "temper-item-type/container-stackable",
  ],
  parent: "temper-browser-category/consumables",
  createdAt: "2026-09-27T04:08:47.712Z",
  updatedAt: "2026-09-27T04:34:39.000Z",
} as const satisfies TemperBrowserCategory
