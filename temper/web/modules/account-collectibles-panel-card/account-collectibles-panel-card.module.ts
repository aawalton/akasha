import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const accountCollectiblesPanelCard = {
  id: "01a06421-f74a-7ed8-8ece-3f5c507e0002",
  type: "page-type/module",
  slug: "account-collectibles-panel-card",
  definition: "the collectibles the account has unlocked, by category",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its title is read from its completion category page.",
    },
  ],
} as const satisfies Module
