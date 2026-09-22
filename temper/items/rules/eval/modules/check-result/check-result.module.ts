import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkResult = {
  id: "01a06137-f968-771f-a84a-6b5df7704c70",
  type: "page-type/module",
  slug: "check-result",
  definition:
    "the result kinds a condition checker may return, being the condition results plus skip",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A checker's skip kind is distinct from the passing kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A list condition holding what is no list answers the misshapen kind naming what it held.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every non-skip kind comes unchanged from the shared condition result type.",
    },
  ],
} as const satisfies Module
