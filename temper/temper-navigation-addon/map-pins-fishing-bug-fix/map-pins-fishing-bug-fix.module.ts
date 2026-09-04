import type { Module } from "@akasha/code-system/module"

export const mapPinsFishingBugFix = {
  id: "01a06269-2aac-7a19-8225-464a414a73a0",
  pageTypeSlug: "module",
  slug: "map-pins-fishing-bug-fix",
  definition: "the fishing holes the game misplaces, corrected",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
