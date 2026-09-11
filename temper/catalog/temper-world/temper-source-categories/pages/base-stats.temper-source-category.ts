import type { TemperSourceCategory } from "akasha/temper/catalog/temper-world/temper-source-categories/temper-source-category.page-type.types.ts"

export const baseStats = {
  id: "019e3104-cbf9-7a81-8327-9f984f30500b",
  pageTypeSlug: "temper-source-category",
  type: "temper-source-category",
  slug: "base-stats",
  title: "Base Stats",
  displayOrder: 1,
  categoryId: "base",
} as const satisfies TemperSourceCategory
