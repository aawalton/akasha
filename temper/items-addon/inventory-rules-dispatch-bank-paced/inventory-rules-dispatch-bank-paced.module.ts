import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inventoryRulesDispatchBankPaced = {
  id: "01a06258-b530-7ef5-9ff0-40428a6c5232",
  type: "module",
  slug: "inventory-rules-dispatch-bank-paced",
  definition: "the chain of bank moves issued a batch at a time with a cooldown between batches",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A batch holds fifty moves, and the next batch waits five seconds.",
    },
    {
      invariantKind: "departure",
      statement: "Every move in a batch is issued without waiting for the one before it.",
    },
    {
      invariantKind: "departure",
      statement: "A move a cooldown ends with nothing taken from its slot is issued again.",
    },
    {
      invariantKind: "departure",
      statement: "A move given up on leaves the moves after it alone.",
    },
  ],
} as const satisfies Module
