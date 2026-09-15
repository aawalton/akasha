import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleTemplateTable = {
  id: "01a06100-3bfd-7c3a-a467-2c2131163905",
  type: "module",
  slug: "rule-template-table",
  definition: "the 48 rule templates gathered from the two groups with them, in one order",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "This code is written out from the rule-template pages rather than by hand.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A template's place in this table is the order the rules are tried in.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A template moved to another place changes which rule an item matches first.",
    },
  ],
} as const satisfies Module
