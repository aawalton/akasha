import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const miscellaneousScribing = {
  id: "01a0e10d-1b61-71d8-a8a4-5c637fe13f81",
  type: "page-type/temper-browser-category",
  slug: "miscellaneous-scribing",
  title: "Scribing",
  displayOrder: 11,
  parent: "temper-browser-category/miscellaneous",
} as const satisfies TemperBrowserCategory
