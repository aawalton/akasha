import type { Module } from "@akasha/code-system/module"

export const housingEntry = {
  id: "01a06129-7a1f-70f0-ad54-6090ba1a912c",
  pageTypeSlug: "module",
  slug: "housing-entry",
  definition: "the first file the game reaches for the housing add-on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every part of the add-on is reached from here.",
    },
    {
      invariantKind: "departure",
      statement: "The add-on waits for the game to name the add-on before loading begins.",
    },
  ],
} as const satisfies Module
