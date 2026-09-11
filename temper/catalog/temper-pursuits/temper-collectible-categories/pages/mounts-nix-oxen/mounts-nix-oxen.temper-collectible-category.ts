import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const mountsNixOxen = {
  id: "01a06165-9169-7014-9a8c-a08fc3df33b6",
  pageTypeSlug: "temper-collectible-category",
  type: "temper-collectible-category",
  slug: "mounts-nix-oxen",
  title: "Nix-Oxen",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
