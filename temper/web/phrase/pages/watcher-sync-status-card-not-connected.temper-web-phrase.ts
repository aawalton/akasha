import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherSyncStatusCardNotConnected = {
  id: "01a0e2ad-28e7-7351-9ecc-39861477d533",
  type: "page-type/temper-web-phrase",
  slug: "watcher-sync-status-card-not-connected",
  title: "Nothing has synced yet",
  description:
    "Temper has never received game data for this account — no characters and no inventory. Everything below is what it takes to change that.",
} as const satisfies TemperWebPhrase
