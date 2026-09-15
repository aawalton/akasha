import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleConditionEval = {
  id: "01a06137-f96d-7493-bbc2-36975759b675",
  type: "module",
  slug: "rule-condition-eval",
  definition:
    "the fixed order of condition checkers run against one compiled rule and one item's facts",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The first checker answering neither the passing nor the skip kind ends the condition run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule every checker skips gets the passing result.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The numeric checker runs ahead of every other condition checker.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Every checker receives the whole compiled rule rather than one condition field.",
    },
  ],
} as const satisfies Module
