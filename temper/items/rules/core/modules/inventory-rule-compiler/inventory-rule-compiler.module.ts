import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRuleCompiler = {
  id: "01a06100-3bed-7b56-8709-2a82c720204e",
  type: "page-type/module",
  slug: "inventory-rule-compiler",
  definition: "an item rule turned into the compiled form the game addon and the web matcher read",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule compiles to one ordered entry.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A compiled rule's place in the list is the order the rules are tried in.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A rule moved to another place changes which rule an item matches first.",
    },
  ],
} as const satisfies Module
