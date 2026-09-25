import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRuleWrites = {
  id: "01a072dd-5d04-75d2-8bb2-1d5b8ac04825",
  type: "page-type/module",
  slug: "inventory-rule-writes",
  definition: "the rule pages a browser writes and takes away to make the pages say what it has",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule the pages already say is written again by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule page no rule wants any longer is taken away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule whose place among the rules moved is written again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry key is named where the rule has rows or where the page has rows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry key named carrying no row empties the file beside the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is compared over the fields the write states rather than every field.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The id a landed row has is therefore no difference.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field holding records is compared by what the records say.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field a rule drops is cleared from the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field the page already lacks is no change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write merges onto the page.",
    },
  ],
} as const satisfies Module
