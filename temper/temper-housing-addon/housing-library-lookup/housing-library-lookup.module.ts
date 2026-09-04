import type { Module } from "@akasha/code-system/module"

export const housingLibraryLookup = {
  id: "01a06128-d5ce-7064-a84c-9ce7846075e6",
  pageTypeSlug: "module",
  slug: "housing-library-lookup",
  definition: "choosing the European or North American community library for this world",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Which library answers is decided by the world the player is on.",
    },
  ],
} as const satisfies Module
