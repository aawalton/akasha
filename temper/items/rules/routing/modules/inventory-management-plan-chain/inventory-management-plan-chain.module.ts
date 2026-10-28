import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryManagementPlanChain = {
  id: "01a0615a-a1da-742b-ae13-b527b4574811",
  type: "page-type/module",
  slug: "inventory-management-plan-chain",
  definition: "a rule's items spread down a chain of destinations, tier by tier",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tier a character is not eligible for gives that character nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a character already holds counts towards that character's own target first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No character both deposits and withdraws one stocked item.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tier takes up to the count the tier names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The items one tier leaves over are offered to the tier below.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The items the last tier leaves over are threaded on to the next rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A `vendor` tier sells at a merchant what every tier above it leaves, the holder selling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A holder sells nothing a character short of its target or a short tier needs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule's first-listed item ids take the tiers before the ids listed after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Of one item, what storage holds takes the tiers before what characters hold.",
    },
  ],
  createdAt: "2026-09-02T09:02:04.762Z",
  updatedAt: "2026-10-28T22:04:11.299Z",
} as const satisfies Module
