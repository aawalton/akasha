import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const materialsBlacksmithing = {
  id: "01a0e10d-1b61-7f26-a797-320bd4b51c91",
  type: "page-type/temper-browser-category",
  slug: "materials-blacksmithing",
  title: "Blacksmithing",
  displayOrder: 2,
  match: "Materials",
  itemTypes: [
    "temper-item-type/blacksmithing-raw-material",
    "temper-item-type/blacksmithing-material",
    "temper-item-type/blacksmithing-booster",
  ],
  parent: "temper-browser-category/materials",
} as const satisfies TemperBrowserCategory
