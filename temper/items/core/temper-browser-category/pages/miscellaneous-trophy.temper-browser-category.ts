import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const miscellaneousTrophy = {
  id: "01a0e10d-1b61-7cea-9327-59ab54d191a2",
  type: "page-type/temper-browser-category",
  slug: "miscellaneous-trophy",
  title: "Trophy",
  displayOrder: 7,
  parent: "temper-browser-category/miscellaneous",
} as const satisfies TemperBrowserCategory
