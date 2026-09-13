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
      statement: "The five seconds a batch waits are counted from when that batch was issued.",
    },
    {
      invariantKind: "departure",
      statement:
        "A batch the game has taken every move of is settled at once rather than waited out.",
    },
    {
      invariantKind: "departure",
      statement: "A chain with nothing left to issue ends the moment its last batch lands.",
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
    {
      invariantKind: "departure",
      statement: "Closing the bank ends the chain, and how many moves went unsent is said.",
    },
    {
      invariantKind: "departure",
      statement: "A chain that drains every step tells its caller the chain has settled.",
    },
    {
      invariantKind: "departure",
      statement: "A chain closing the bank ended tells its caller nothing.",
    },
  ],
} as const satisfies Module
