import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryPlanSaying = {
  id: "01a18411-9106-7195-a745-c820a0f46ac1",
  type: "page-type/module",
  slug: "inventory-plan-saying",
  definition:
    "the lines a management plan is said in, a line to each stop and the houses it places in",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A stop's line counts each step word's stacks, in the order the stop takes them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A step taking an item out of storage is said as withdraw.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A step at a house is said as place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A house to scan first is said as the storage carrier's errand, before any placement.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A house a plan places in is said with the stacks and the items it takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The houses close on the vault slots the plan frees and the house slots it uses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A plan naming no house rule says no house line.",
    },
  ],
  createdAt: "2026-10-28T19:51:46.182Z",
  updatedAt: "2026-10-28T19:51:46.182Z",
} as const satisfies Module
