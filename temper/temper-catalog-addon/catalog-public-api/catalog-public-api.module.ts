import type { Module } from "@akasha/code-system/module"

export const catalogPublicApi = {
  id: "01a063ba-94e5-75b2-87c7-9dffc0a06b28",
  pageTypeSlug: "module",
  slug: "catalog-public-api",
  definition: "the global another add-on reaches the collected catalog table through",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The global is named for the addon.",
    },
    {
      invariantKind: "departure",
      statement: "The global carries the one reader and nothing more.",
    },
  ],
} as const satisfies Module
