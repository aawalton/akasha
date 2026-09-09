import type { Module } from "@akasha/code/module"

export const companionsSummaryPanel = {
  id: "01a0611d-84e5-7467-8cd2-0efd143eb949",
  pageTypeSlug: "module",
  slug: "companions-summary-panel",
  definition: "the table of one row per companion the summary tab is drawn from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Column positions are fixed numbers rather than measured from content.",
    },
  ],
} as const satisfies Module
