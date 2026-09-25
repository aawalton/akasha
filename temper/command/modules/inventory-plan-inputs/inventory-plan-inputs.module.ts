import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryPlanInputs = {
  id: "01a068e2-2271-7832-853b-12f5d89083b0",
  type: "page-type/module",
  slug: "inventory-plan-inputs",
  definition:
    "everything a rule walk needs, taken from saved variables files or the stored holdings reading",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The inventory and the characters are read from two files rather than one file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that cannot be read is refused as data.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file refused as data names the path that file was read at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A compiled rule the addon left unnamed is named for its place in the order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Stock is counted only for the consumables somebody wants.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A location whose key is not a number is no character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The item rules the addon compiled are gathered beside the ordered rules.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The skill line ranks and the curse state a character captured reach the rules a plan runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The stored holdings reading is the whole reading the watcher filed on the account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account with no stored holdings reading is refused rather than read as empty.",
    },
  ],
} as const satisfies Module
