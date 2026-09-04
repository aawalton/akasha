import type { Module } from "@akasha/code-system/module"

export const inventoryCategoryTree = {
  id: "01a06258-b52a-7a34-8e85-b99f40b1b436",
  pageTypeSlug: "module",
  slug: "inventory-category-tree",
  definition: "the item category tree flattened into nodes keyed by id, with parents and children",
  code: "ts",
} as const satisfies Module
