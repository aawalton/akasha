import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleSetWrites = {
  id: "01a0d8d4-7a85-76b1-9c82-691fa1d7233d",
  type: "page-type/module",
  slug: "rule-set-writes",
  definition: "a player's whole set of rules, read from their pages and saved back as pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A set of rules holds the rules, the item rules and the buy rules of one account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each kind of rule is saved to the pages of its own page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every write is worked out before any page is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set saying nothing of item rules or buy rules leaves those pages alone.",
    },
  ],
} as const satisfies Module
