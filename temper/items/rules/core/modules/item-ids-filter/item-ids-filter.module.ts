import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemIdsFilter = {
  id: "01a0dece-5017-7b98-a5f4-9eb18792ff1e",
  type: "page-type/module",
  slug: "item-ids-filter",
  definition: "the Item Ids condition a rule may carry, as the rule editor shows it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter reads and clears the condition `itemIds`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The editor shows this condition where a rule has it and offers no way to add it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two rules listing the same ids in another order are told apart.",
    },
  ],
} as const satisfies Module
