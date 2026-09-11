import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const watcherSyncStatusCard = {
  id: "01a06432-b190-7ebf-b524-c6e62f828d65",
  type: "module",
  slug: "watcher-sync-status-card",
  definition: "the card telling what the watcher last synced, counted by source",
  code: "tsx",
} as const satisfies Module
