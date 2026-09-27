import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const companionAll = {
  id: "01a0e10d-1b60-7092-b152-e25dc6552e3f",
  type: "page-type/temper-browser-category",
  slug: "companion-all",
  title: "All",
  displayOrder: 1,
  parent: "temper-browser-category/companion",
} as const satisfies TemperBrowserCategory
