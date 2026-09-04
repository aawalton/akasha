import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const defaultRulesData = {
  id: "01a06100-3bea-7c4a-93e9-7fb293bfd0c3",
  pageTypeSlug: "module",
  slug: "default-rules-data",
  definition:
    "the rule set a player starts from, which is the rule templates in the order they are given",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The starting rules are the rule templates and nothing besides.",
    },
    {
      invariantKind: "departure",
      statement: "A starting rule is switched off until the player switches the rule on.",
    },
  ],
} as const satisfies Module
