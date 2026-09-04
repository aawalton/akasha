import type { Module } from "@akasha/code-system/module"

export const companionsSummaryPanel = {
  id: "01a0611d-84e5-7467-8cd2-0efd143eb949",
  pageTypeSlug: "module",
  slug: "companions-summary-panel",
  definition: "the panel showing every companion's gear, skills and build match in one table",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row colours by how near the worn build is to the target build.",
    },
  ],
} as const satisfies Module
