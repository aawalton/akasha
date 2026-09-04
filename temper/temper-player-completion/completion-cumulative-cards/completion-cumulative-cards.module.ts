import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionCumulativeCards = {
  id: "01a06108-2fee-74d3-95b3-542ec82718a6",
  pageTypeSlug: "module",
  slug: "completion-cumulative-cards",
  definition: "the account and character cards that count for all time",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here counts what a character has earned.",
    },
  ],
} as const satisfies Module
