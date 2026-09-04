import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const stockChainVisit = {
  id: "01a06100-3bfe-7ffb-9774-39a6a9d3d6ba",
  pageTypeSlug: "module",
  slug: "stock-chain-visit",
  definition: "what a single visit to a storage chain fills first and where the surplus cascades",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A chain naming no by-priority tier answers no visit plan.",
    },
    {
      invariantKind: "departure",
      statement: "The tiers below the fill tier are the surplus cascade.",
    },
  ],
} as const satisfies Module
