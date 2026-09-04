import type { Module } from "@akasha/code-system/module"

export const housingFavoritesHelpers = {
  id: "01a06128-d5cc-76f2-8086-9f1e6d3a27b9",
  pageTypeSlug: "module",
  slug: "housing-favorites-helpers",
  definition: "adding, removing and finding a favourite house",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A favourite's place in the saved list is the number a keybind ports to.",
    },
  ],
} as const satisfies Module
