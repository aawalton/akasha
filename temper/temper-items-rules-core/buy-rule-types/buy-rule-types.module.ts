import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const buyRuleTypes = {
  id: "01a060d9-44c9-749c-9acb-57edbe6a08a9",
  pageTypeSlug: "module",
  slug: "buy-rule-types",
  definition: "the shape of a rule saying how many of one item to keep bought",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A buy rule names one item and one target quantity.",
    },
    {
      invariantKind: "departure",
      statement: "A merchant is the only source a buy rule buys from.",
    },
  ],
} as const satisfies Module
