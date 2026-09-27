import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const miscellaneousStolen = {
  id: "01a0e10d-1b61-7827-aa9e-b8745fbbced5",
  type: "page-type/temper-browser-category",
  slug: "miscellaneous-stolen",
  title: "Stolen",
  displayOrder: 9,
  match: "Stolen",
  parent: "temper-browser-category/miscellaneous",
} as const satisfies TemperBrowserCategory
