import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryBuildItemFacts = {
  id: "01a06258-b529-71ba-8496-6c343352f8de",
  type: "page-type/module",
  slug: "inventory-build-item-facts",
  definition: "the facts about one item that the rule evaluator judges, read from a slot or a link",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A bound item has a replacement value and no market value.",
    },
  ],
} as const satisfies Module
