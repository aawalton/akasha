import type { Module } from "@akasha/code-system/module"

export const addonDataWritesSets = {
  id: "01a06837-d6c9-7314-9d59-027ee56c58e8",
  pageTypeSlug: "module",
  slug: "addon-data-writes-sets",
  definition: "the sets section of a run's output, as the writes the section stands for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A section renders some of its tables from pages and some from what temper holds.",
    },
    {
      invariantKind: "departure",
      statement: "A section states its writes rather than performing them.",
    },
  ],
} as const satisfies Module
