import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const miscellaneousAppearance = {
  id: "01a0e10d-1b61-764b-ab18-2c43c8f31aa3",
  type: "page-type/temper-browser-category",
  slug: "miscellaneous-appearance",
  title: "Appearance",
  displayOrder: 2,
  match: "Appearance",
  specializedItemTypes: [
    "temper-specialized-item-type/disguise",
    "temper-specialized-item-type/costume",
    "temper-specialized-item-type/tabard",
  ],
  parent: "temper-browser-category/miscellaneous",
} as const satisfies TemperBrowserCategory
