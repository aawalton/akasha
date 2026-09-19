import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryParser = {
  id: "01a060c5-3c22-7fe6-8e12-c63f5595790d",
  type: "page-type/module",
  slug: "inventory-parser",
  definition: "the rows an inventory capture has, read out of a saved variables body",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A field the capture holds for an item reaches the item read out of it.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A capture written before the rename says estimatedValue where marketValue is meant.",
    },
  ],
} as const satisfies Module
