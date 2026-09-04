import type { Module } from "@akasha/code-system/module"

export const addonDataWritesStats = {
  id: "01a06837-d6c9-7ffe-a9b2-19686e944a5d",
  pageTypeSlug: "module",
  slug: "addon-data-writes-stats",
  definition: "the stats section of a run's output, as the writes the section stands for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The metric tree is the whole of what the stats section renders.",
    },
    {
      invariantKind: "departure",
      statement: "A section states its writes rather than performing them.",
    },
  ],
} as const satisfies Module
