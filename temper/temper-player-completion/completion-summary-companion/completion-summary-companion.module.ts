import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionSummaryCompanion = {
  id: "01a06124-14db-7fde-9ac1-6e23fae35a9d",
  pageTypeSlug: "module",
  slug: "completion-summary-companion",
  definition: "one line per companion card, counting what an account has of what there is",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A caller naming companions is counted on the companions the caller named.",
    },
    {
      invariantKind: "absence",
      statement: "A companion of no known level counts toward no level total.",
    },
  ],
} as const satisfies Module
