import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesDispatchBank = {
  id: "01a06258-b531-7715-8d2a-26fd26ca0747",
  type: "module",
  slug: "inventory-rules-dispatch-bank",
  definition: "what happens when the bank opens, and the one move used by every bank step",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "What a visit withdraws and deposits is bounded by backpack room and storage room, never by a count.",
    },
    {
      invariantKind: "departure",
      statement: "Every backpack slot is judged afresh when the bank opens.",
    },
    {
      invariantKind: "departure",
      statement:
        "A visit stacks the backpack and the storage it opened once every move that visit plans has settled.",
    },
    {
      invariantKind: "departure",
      statement: "A visit whose bank closed early stacks the bags it opened all the same.",
    },
    {
      invariantKind: "departure",
      statement: "Stacking waits for the moves to arrive rather than only for them to leave.",
    },
    {
      invariantKind: "departure",
      statement: "A stacking record reaching a later visit than the one it is of is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "The setting that stacks the backpack at login is the setting that stacks here.",
    },
  ],
} as const satisfies Module
