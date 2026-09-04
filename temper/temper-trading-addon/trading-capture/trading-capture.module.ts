import type { Module } from "@akasha/code-system/module"

export const tradingCapture = {
  id: "01a06160-2a5a-79c4-b846-d793f9f0aff7",
  pageTypeSlug: "module",
  slug: "trading-capture",
  definition: "recording the search results and the player's own listings into saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A capture replaces the guild's earlier snapshot rather than adding to the snapshot.",
    },
  ],
} as const satisfies Module
