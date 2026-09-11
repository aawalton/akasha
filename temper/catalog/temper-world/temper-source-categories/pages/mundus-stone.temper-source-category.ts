import type { TemperSourceCategory } from "akasha/temper/catalog/temper-world/temper-source-categories/temper-source-category.page-type.types.ts"

export const mundusStone = {
  id: "019e3104-cc09-72af-8b30-66d811fbaf36",
  type: "temper-source-category",
  slug: "mundus-stone",
  title: "Mundus Stone",
  displayOrder: 10,
  categoryId: "mundus",
} as const satisfies TemperSourceCategory
