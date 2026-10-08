import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const materialsClothing = {
  id: "01a0e10d-1b61-7a98-82a7-c0a02eb5d2ec",
  type: "page-type/temper-browser-category",
  slug: "materials-clothing",
  title: "Clothing",
  displayOrder: 3,
  match: "Materials",
  itemTypes: [
    "temper-item-type/clothier-raw-material",
    "temper-item-type/clothier-material",
    "temper-item-type/clothier-booster",
  ],
  parent: "temper-browser-category/materials",
  createdAt: "2026-09-27T04:08:47.713Z",
  updatedAt: "2026-09-27T04:34:39.000Z",
} as const satisfies TemperBrowserCategory
