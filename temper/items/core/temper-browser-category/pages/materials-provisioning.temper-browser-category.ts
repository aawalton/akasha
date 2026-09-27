import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const materialsProvisioning = {
  id: "01a0e10d-1b61-7b81-a9aa-26659745ceb6",
  type: "page-type/temper-browser-category",
  slug: "materials-provisioning",
  title: "Provisioning",
  displayOrder: 8,
  parent: "temper-browser-category/materials",
} as const satisfies TemperBrowserCategory
