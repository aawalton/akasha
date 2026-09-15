import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stockChainVisit = {
  id: "01a06100-3bfe-7ffb-9774-39a6a9d3d6ba",
  type: "page-type/module",
  slug: "stock-chain-visit",
  definition: "what a single visit to a storage chain fills first and where the surplus cascades",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chain naming no by-priority tier answers no visit plan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tiers below the fill tier are the surplus cascade.",
    },
  ],
} as const satisfies Module
