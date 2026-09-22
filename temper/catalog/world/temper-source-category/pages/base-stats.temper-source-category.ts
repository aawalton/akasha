import type { TemperSourceCategory } from "akasha/temper/catalog/world/temper-source-category/temper-source-category.page-type.types.ts"

export const baseStats = {
  id: "019e3104-cbf9-7a81-8327-9f984f30500b",
  type: "page-type/temper-source-category",
  slug: "base-stats",
  title: "Base Stats",
  displayOrder: 1,
  key: "base",
} as const satisfies TemperSourceCategory
