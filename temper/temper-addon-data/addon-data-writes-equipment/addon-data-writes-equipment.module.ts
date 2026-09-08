import type { Module } from "@akasha/code/module"

export const addonDataWritesEquipment = {
  id: "01a06837-d6c9-74ca-91b9-4e771dc5a29b",
  pageTypeSlug: "module",
  slug: "addon-data-writes-equipment",
  definition: "the equipment section of a run's output, as the writes the section represents",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Every equipment table is rendered from the rows of the page type with that table.",
    },
    {
      invariantKind: "departure",
      statement: "A destination takes more than one table of the section.",
    },
    {
      invariantKind: "departure",
      statement: "A section states the section's writes rather than performing the writes.",
    },
  ],
} as const satisfies Module
