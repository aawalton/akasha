import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryResolvedVerdictReading = {
  id: "01a09f6b-6ce3-7c23-8e9b-6f17d1c8fd44",
  type: "module",
  slug: "inventory-resolved-verdict-reading",
  definition: "the verdict an addon run recorded on a captured item, and a fresh one beside it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A fresh verdict takes the routes the addon's own run takes, in that order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A route carries a rule index only where an ordered rule resolved the item.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item no rule reaches is resolved to nothing rather than to no verdict.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the game, so an allocation the game makes is not mirrored.",
    },
  ],
} as const satisfies Module
