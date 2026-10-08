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
  createdAt: "2026-09-02T21:59:02.730Z",
  updatedAt: "2026-09-27T11:31:19.000Z",
} as const satisfies Module
