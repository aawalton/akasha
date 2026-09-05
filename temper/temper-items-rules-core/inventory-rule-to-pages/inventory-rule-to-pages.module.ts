import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryRuleToPages = {
  id: "01a072b6-0546-7d78-8e19-d3cb86901c69",
  pageTypeSlug: "module",
  slug: "inventory-rule-to-pages",
  definition: "a rule a player holds written out as a page and the entries beside it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule's page is slugged `rule-` and the id the rule carries.",
    },
    {
      invariantKind: "departure",
      statement: "Where a rule falls among the rules is written as its display order.",
    },
    {
      invariantKind: "departure",
      statement:
        "A condition value is written as JSON except where it is text no JSON reader would take.",
    },
    {
      invariantKind: "departure",
      statement: "A rule saying nothing about being switched on is written as switched on.",
    },
    {
      invariantKind: "departure",
      statement: "A rule saying nothing about when it changed is written as the epoch.",
    },
    {
      invariantKind: "gap",
      statement: "A rule carrying neither of those two comes back saying both.",
    },
  ],
} as const satisfies Module
