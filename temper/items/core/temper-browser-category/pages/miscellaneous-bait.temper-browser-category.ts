import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const miscellaneousBait = {
  id: "01a0e10d-1b61-7bdf-bc46-ce4e90b061cb",
  type: "page-type/temper-browser-category",
  slug: "miscellaneous-bait",
  title: "Bait",
  displayOrder: 8,
  parent: "temper-browser-category/miscellaneous",
} as const satisfies TemperBrowserCategory
