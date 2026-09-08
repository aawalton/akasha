import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryRuleWrites = {
  id: "01a072dd-5d04-75d2-8bb2-1d5b8ac04825",
  pageTypeSlug: "module",
  slug: "inventory-rule-writes",
  definition: "the rule pages a browser writes and takes away to make the pages say what it has",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule the pages already say is written again by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A rule page no rule wants any longer is taken away.",
    },
    {
      invariantKind: "departure",
      statement: "A rule whose place among the rules moved is written again.",
    },
    {
      invariantKind: "departure",
      statement: "An entry key is named where the rule has rows or where the page has rows.",
    },
    {
      invariantKind: "departure",
      statement: "An entry key named carrying no row empties the file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "A row is compared over the fields the write states rather than every field.",
    },
    {
      invariantKind: "departure",
      statement: "The id a landed row has is therefore no difference.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the pages.",
    },
    {
      invariantKind: "gap",
      statement: "A key a rule drops is kept by the page.",
    },
    {
      invariantKind: "departure",
      statement: "A write merges onto the page.",
    },
  ],
} as const satisfies Module
