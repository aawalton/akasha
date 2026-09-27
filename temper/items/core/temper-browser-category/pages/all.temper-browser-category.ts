import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const all = {
  id: "01a0e10d-1b5f-7ac0-bab5-38627c084d19",
  type: "page-type/temper-browser-category",
  slug: "all",
  title: "All",
  displayOrder: 1,
  match: "All",
} as const satisfies TemperBrowserCategory
