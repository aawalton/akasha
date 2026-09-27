import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const miscellaneousAll = {
  id: "01a0e10d-1b61-7850-bee4-ff98d4fe3617",
  type: "page-type/temper-browser-category",
  slug: "miscellaneous-all",
  title: "All",
  displayOrder: 1,
  parent: "temper-browser-category/miscellaneous",
} as const satisfies TemperBrowserCategory
