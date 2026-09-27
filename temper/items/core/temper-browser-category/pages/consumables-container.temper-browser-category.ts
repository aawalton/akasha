import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const consumablesContainer = {
  id: "01a0e10d-1b60-7b3e-beaf-9f33fb6340e4",
  type: "page-type/temper-browser-category",
  slug: "consumables-container",
  title: "Container",
  displayOrder: 9,
  parent: "temper-browser-category/consumables",
} as const satisfies TemperBrowserCategory
