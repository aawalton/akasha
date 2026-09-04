import type { Module } from "@akasha/code-system/module"

export const hudAddonFormat = {
  id: "01a061c5-18dd-7001-884c-e18901d8f626",
  pageTypeSlug: "module",
  slug: "hud-addon-format",
  definition: "the words a bar cell reads a rate, a delay and a span in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading below zero is shown as zero.",
    },
    {
      invariantKind: "departure",
      statement: "A span under an hour drops the hour.",
    },
  ],
} as const satisfies Module
