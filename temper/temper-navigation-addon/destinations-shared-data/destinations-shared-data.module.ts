import type { Module } from "@akasha/code-system/module"

export const destinationsSharedData = {
  id: "01a06269-29ed-7b61-af94-d692a43a3bb9",
  pageTypeSlug: "module",
  slug: "destinations-shared-data",
  definition:
    "the shared achievement rows by zone, and the stables, docks and portals, joined from its runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module
