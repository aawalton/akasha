import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherSyncStatusCardNoCapture = {
  id: "01a0e2ad-28e7-7cb1-80fd-45c8a89fe1de",
  type: "page-type/temper-web-phrase",
  slug: "watcher-sync-status-card-no-capture",
  title: "Watcher last reached Temper{contactAgo}",
  description:
    "The Watcher is linked and reaching Temper, but no inventory has arrived, so Temper cannot say how old your game data is. The times below are when each source last reached Temper — not when the game recorded it.",
} as const satisfies TemperWebPhrase
