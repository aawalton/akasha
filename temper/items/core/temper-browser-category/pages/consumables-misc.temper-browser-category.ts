import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const consumablesMisc = {
  id: "01a0e10d-1b60-74de-ae45-7fa3c48af7ec",
  type: "page-type/temper-browser-category",
  slug: "consumables-misc",
  title: "Misc",
  displayOrder: 12,
  parent: "temper-browser-category/consumables",
} as const satisfies TemperBrowserCategory
