import type { Module } from "@akasha/code-system/module"

export const tradingBrowseEngine = {
  id: "01a06160-2a59-7c89-b1b4-4a07fc4e70d1",
  pageTypeSlug: "module",
  slug: "trading-browse-engine",
  definition: "running a guild store search and holding the results a player is browsing",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Results are held as read rather than sorted on arrival.",
    },
  ],
} as const satisfies Module
