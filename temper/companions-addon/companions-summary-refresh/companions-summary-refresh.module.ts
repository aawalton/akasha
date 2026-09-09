import type { Module } from "@akasha/code/module"

export const companionsSummaryRefresh = {
  id: "01a08871-6a01-7c73-b5a1-f0397f9ff734",
  pageTypeSlug: "module",
  slug: "companions-summary-refresh",
  definition: "filling the companion summary table from live gear or from a saved build",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row colours by how near the worn build is to the target build.",
    },
  ],
} as const satisfies Module
