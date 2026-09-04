import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const checkResult = {
  id: "01a06137-f968-771f-a84a-6b5df7704c70",
  pageTypeSlug: "module",
  slug: "check-result",
  definition:
    "the result kinds one condition checker may return, being the condition results plus skip",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A checker's skip kind is distinct from the passing kind.",
    },
    {
      invariantKind: "constraint",
      statement: "Every non-skip kind comes unchanged from the shared condition result type.",
    },
  ],
} as const satisfies Module
