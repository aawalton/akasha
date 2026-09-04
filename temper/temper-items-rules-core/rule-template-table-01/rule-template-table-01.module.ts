import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const ruleTemplateTable01 = {
  id: "01a06100-3bfc-7142-8fe2-abb5978a1b49",
  pageTypeSlug: "module",
  slug: "rule-template-table-01",
  definition: "the first 24 rule templates, in the order the rules are tried in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the rule-template pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "A template's place in this group is the order the rules are tried in.",
    },
    {
      invariantKind: "gap",
      statement: "A template moved out of this group changes which rule an item matches first.",
    },
  ],
} as const satisfies Module
