import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const deconCraftingTypeInference = {
  id: "01a060c5-3c1e-748f-a336-d6bc89284ddb",
  pageTypeSlug: "module",
  type: "module",
  slug: "decon-crafting-type-inference",
  definition: "the crafting type an item deconstructs into, inferred from the item",
  code: "ts",
} as const satisfies Module
