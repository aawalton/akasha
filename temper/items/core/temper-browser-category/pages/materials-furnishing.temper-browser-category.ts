import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const materialsFurnishing = {
  id: "01a0e10d-1b61-723d-9305-fed57bddf979",
  type: "page-type/temper-browser-category",
  slug: "materials-furnishing",
  title: "Furnishing",
  displayOrder: 11,
  match: "Materials",
  itemTypes: ["temper-item-type/furnishing-material"],
  parent: "temper-browser-category/materials",
  createdAt: "2026-09-27T04:08:47.713Z",
  updatedAt: "2026-09-27T04:34:39.000Z",
} as const satisfies TemperBrowserCategory
