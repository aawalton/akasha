import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stockChainVisit = {
  id: "01a06100-3bfe-7ffb-9774-39a6a9d3d6ba",
  type: "page-type/module",
  slug: "stock-chain-visit",
  definition: "what a single visit to a storage chain fills first and where the surplus cascades",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chain's fill tier is its first tier sending to a character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fill tier sends to characters by priority or to one character it names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fill tier naming a character fills that character and no other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chain with no fill tier answers no visit plan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tiers below the fill tier are the surplus cascade.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chain's target is the fill tier's quantity times the characters that tier takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each tier after the fill tier adds its quantity, and a tier with none adds 0.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chain with no fill tier has no target.",
    },
  ],
} as const satisfies Module
