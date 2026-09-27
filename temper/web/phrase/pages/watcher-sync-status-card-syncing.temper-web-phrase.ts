import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherSyncStatusCardSyncing = {
  id: "01a0e2ad-28e7-7577-b8eb-266ff1ba9a36",
  type: "page-type/temper-web-phrase",
  slug: "watcher-sync-status-card-syncing",
  title: "Game data captured{capturedAgo}",
  description:
    "The Watcher is linked, and the newest game data it sent was captured at the time above. If that capture time stops advancing while you play, what reaches Temper has stopped.",
} as const satisfies TemperWebPhrase
