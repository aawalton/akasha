import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inventoryTooltipRuleLine = {
  id: "01a06258-b534-70ec-b172-fd006cbff261",
  type: "module",
  slug: "inventory-tooltip-rule-line",
  definition: "the tooltip line naming the rule that matched an item and what it will do",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A stocked item names what is held here and what is sent on as two lines.",
    },
    {
      invariantKind: "departure",
      statement: "A stocked item carrying no more than it holds names nowhere to send the rest.",
    },
    {
      invariantKind: "departure",
      statement: "What is sent on is reckoned by the rule the bank deposits by.",
    },
  ],
} as const satisfies Module
