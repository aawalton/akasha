import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inventoryRulesDispatchBankPaced = {
  id: "01a06258-b530-7ef5-9ff0-40428a6c5232",
  type: "module",
  slug: "inventory-rules-dispatch-bank-paced",
  definition: "sending a visit's bank moves inside the stack-move limit the game enforces",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The game allows a hundred stack moves in any ten seconds, and that is the budget.",
    },
    {
      invariantKind: "departure",
      statement: "Withdrawals and deposits spend one budget, because the game counts them as one.",
    },
    {
      invariantKind: "departure",
      statement: "The budget is spent by what was sent, so a move sent again spends from it again.",
    },
    {
      invariantKind: "departure",
      statement:
        "The budget is measured over the last ten seconds rather than from a window start.",
    },
    {
      invariantKind: "departure",
      statement: "A move is confirmed on its own, so one straggler holds no other move up.",
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
      statement: "How long to wait before calling a move failed is its own quantity, and shorter.",
    },
    {
      invariantKind: "departure",
      statement: "A move unconfirmed at that deadline is issued again until its attempts run out.",
    },
    {
      invariantKind: "departure",
      statement:
        "A move is issued again only where issuing it again could land it, whatever attempts it has left.",
    },
    {
      invariantKind: "departure",
      statement:
        "Nothing left the source since it was issued and the target has no room: that move could not land.",
    },
    {
      invariantKind: "departure",
      statement: "What the source held is read afresh each time the move is issued.",
    },
    {
      invariantKind: "departure",
      statement: "A move given up on leaves the moves after it alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A move unconfirmed at a settle is written down by its bags, its slots, its item and its count.",
    },
    {
      invariantKind: "departure",
      statement:
        "A move written down says what its source held when issued and what its source holds now.",
    },
    {
      invariantKind: "departure",
      statement:
        "A move written down says what its target slot holds and how much that slot takes.",
    },
    {
      invariantKind: "departure",
      statement: "A move still in flight when the bank closed is written down as the chain ends.",
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
      statement: "A chain the bank closed on tells its caller it settled all the same.",
    },
  ],
} as const satisfies Module
