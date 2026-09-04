import type { Module } from "@akasha/code-system/module"

export const addonDataWritesCompanionMappings = {
  id: "01a06837-d6c9-7650-a4df-e2a75b0339c5",
  pageTypeSlug: "module",
  slug: "addon-data-writes-companion-mappings",
  definition:
    "the companion mapping section of a run's output, as the writes the section stands for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The companion mappings are rendered from the companions temper holds rather than from pages.",
    },
    {
      invariantKind: "departure",
      statement: "A section states its writes rather than performing them.",
    },
  ],
} as const satisfies Module
