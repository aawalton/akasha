import type { TemperSourceCategory } from "akasha/temper/catalog/temper-world/temper-source-category/temper-source-category.page-type.types.ts"

export const debuffs = {
  id: "019e3104-cc0e-7060-a17b-e99f1364599e",
  type: "page-type/temper-source-category",
  slug: "debuffs",
  title: "Debuffs",
  displayOrder: 14,
  categoryId: "debuffs",
} as const satisfies TemperSourceCategory
