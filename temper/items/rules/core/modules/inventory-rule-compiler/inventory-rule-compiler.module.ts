import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRuleCompiler = {
  id: "01a06100-3bed-7b56-8709-2a82c720204e",
  type: "page-type/module",
  slug: "inventory-rule-compiler",
  definition: "an item rule turned into the compiled form the game addon and the web matcher read",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule compiles to one ordered entry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a stocking rule saying it crafts its shortfall compiles as crafting it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a stocking rule saying it buys its shortfall compiles as buying it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a rule buying its shortfall compiles the most it pays for one.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A compiled rule's place in the list is the order the rules are tried in.",
    },
  ],
  createdAt: "2026-09-02T07:23:20.429Z",
  updatedAt: "2026-09-27T14:32:48.000Z",
} as const satisfies Module
