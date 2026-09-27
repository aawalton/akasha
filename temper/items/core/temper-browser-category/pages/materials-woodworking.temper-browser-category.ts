import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const materialsWoodworking = {
  id: "01a0e10d-1b61-709b-b72d-eaf11ec19bee",
  type: "page-type/temper-browser-category",
  slug: "materials-woodworking",
  title: "Woodworking",
  displayOrder: 4,
  match: "Materials",
  itemTypes: [
    "temper-item-type/woodworking-raw-material",
    "temper-item-type/woodworking-material",
    "temper-item-type/woodworking-booster",
  ],
  parent: "temper-browser-category/materials",
} as const satisfies TemperBrowserCategory
