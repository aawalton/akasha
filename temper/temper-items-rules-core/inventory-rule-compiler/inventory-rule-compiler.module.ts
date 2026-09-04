import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryRuleCompiler = {
  id: "01a06100-3bed-7b56-8709-2a82c720204e",
  pageTypeSlug: "module",
  slug: "inventory-rule-compiler",
  definition: "one item rule turned into the compiled form the game addon and the web matcher read",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule compiles to one ordered entry.",
    },
    {
      invariantKind: "constraint",
      statement: "A compiled rule's place in the list is the order the rules are tried in.",
    },
    {
      invariantKind: "gap",
      statement: "A rule moved to another place changes which rule an item matches first.",
    },
  ],
} as const satisfies Module
