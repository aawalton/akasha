import type { Module } from "@akasha/code-system/module"

export const catalogCommands = {
  id: "01a063ba-94e5-701e-9834-3d28bebc065c",
  pageTypeSlug: "module",
  slug: "catalog-commands",
  definition: "what the player's slash command clears and what it prints about each catalog",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Clearing a catalog marks the whole set incomplete so the next login refills the set.",
    },
    {
      invariantKind: "departure",
      statement: "A domain name the add-on does not carry clears nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A clear naming no target lists the domains the last run skipped.",
    },
  ],
} as const satisfies Module
