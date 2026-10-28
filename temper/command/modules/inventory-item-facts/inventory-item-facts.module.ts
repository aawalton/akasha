import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryItemFacts = {
  id: "01a068e2-226e-7e6c-9675-79e0e369017b",
  type: "page-type/module",
  slug: "inventory-item-facts",
  definition: "the facts a rule walk reads off an item held in a place",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An item's key is worked out from the item rather than said by the caller.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item with no place named is still read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether an item was crafted today is judged against the clock as the walk runs.",
    },
  ],
  createdAt: "2026-09-03T20:07:25.550Z",
  updatedAt: "2026-10-28T18:42:46.817Z",
} as const satisfies Module
