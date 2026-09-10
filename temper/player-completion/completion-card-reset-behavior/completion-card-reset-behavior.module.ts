import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionCardResetBehavior = {
  id: "01a06108-2fed-70ac-9ab5-6923a6b5d6c1",
  pageTypeSlug: "module",
  slug: "completion-card-reset-behavior",
  definition: "whether a completion card counts for all time or starts over each day",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "upkeep",
      statement: "Every completion card is named here.",
    },
  ],
} as const satisfies Module
