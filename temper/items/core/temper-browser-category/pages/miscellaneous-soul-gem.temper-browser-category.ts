import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const miscellaneousSoulGem = {
  id: "01a0e10d-1b61-7613-9fd2-fbfb1b7dcb6e",
  type: "page-type/temper-browser-category",
  slug: "miscellaneous-soul-gem",
  title: "Soul Gem",
  displayOrder: 4,
  parent: "temper-browser-category/miscellaneous",
} as const satisfies TemperBrowserCategory
