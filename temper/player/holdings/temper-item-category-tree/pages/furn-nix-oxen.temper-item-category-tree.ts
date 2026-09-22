import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnNixOxen = {
  id: "01a05fcf-f805-7771-bfe4-fb972b93cd82",
  type: "page-type/temper-item-category-tree",
  slug: "furn-nix-oxen",
  title: "Nix-Oxen",
  parent: "temper-item-category-tree/furn-mounts",
  displayOrder: 12,
  furnitureSubcategoryIds: [176],
} as const satisfies TemperItemCategoryTree
