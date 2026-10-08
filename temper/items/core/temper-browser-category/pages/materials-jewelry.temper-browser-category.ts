import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const materialsJewelry = {
  id: "01a0e10d-1b61-7812-933c-4215113ccb3a",
  type: "page-type/temper-browser-category",
  slug: "materials-jewelry",
  title: "Jewelry",
  displayOrder: 5,
  match: "Materials",
  itemTypes: [
    "temper-item-type/jewelrycrafting-raw-material",
    "temper-item-type/jewelrycrafting-material",
    "temper-item-type/jewelrycrafting-booster",
  ],
  parent: "temper-browser-category/materials",
  createdAt: "2026-09-27T04:08:47.713Z",
  updatedAt: "2026-09-27T04:34:39.000Z",
} as const satisfies TemperBrowserCategory
