import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const ruleConditionEval = {
  id: "01a06137-f96d-7493-bbc2-36975759b675",
  pageTypeSlug: "module",
  slug: "rule-condition-eval",
  definition:
    "the fixed order of condition checkers run against one compiled rule and one item's facts",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The first checker answering fail or indeterminate ends the whole condition run.",
    },
    {
      invariantKind: "departure",
      statement: "A rule every checker skips gets the passing result.",
    },
    {
      invariantKind: "departure",
      statement: "The numeric checker runs ahead of every other condition checker.",
    },
    {
      invariantKind: "constraint",
      statement: "Every checker receives the whole compiled rule rather than one condition field.",
    },
  ],
} as const satisfies Module
