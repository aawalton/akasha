import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const materialsEnchanting = {
  id: "01a0e10d-1b61-7322-928d-36274e1ed282",
  type: "page-type/temper-browser-category",
  slug: "materials-enchanting",
  title: "Enchanting",
  displayOrder: 7,
  match: "Materials",
  itemTypes: [
    "temper-item-type/enchanting-rune-aspect",
    "temper-item-type/enchanting-rune-essence",
    "temper-item-type/enchanting-rune-potency",
  ],
  parent: "temper-browser-category/materials",
  createdAt: "2026-09-27T04:08:47.713Z",
  updatedAt: "2026-09-27T04:34:39.000Z",
} as const satisfies TemperBrowserCategory
