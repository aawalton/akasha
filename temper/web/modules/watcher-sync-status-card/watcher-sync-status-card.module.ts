import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherSyncStatusCard = {
  id: "01a06432-b190-7ebf-b524-c6e62f828d65",
  type: "page-type/module",
  slug: "watcher-sync-status-card",
  definition: "the card telling what the watcher last synced, counted by source",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:17:18.992Z",
  updatedAt: "2026-09-27T11:43:22.000Z",
} as const satisfies Module
