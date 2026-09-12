import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inventoryParser = {
  id: "01a060c5-3c22-7fe6-8e12-c63f5595790d",
  type: "module",
  slug: "inventory-parser",
  definition: "the rows an inventory capture has, read out of a saved variables body",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A field the capture holds for an item reaches the item read out of it.",
    },
  ],
} as const satisfies Module
