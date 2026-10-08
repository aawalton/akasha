import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherSyncStatusCardConnectedStaleData = {
  id: "01a0e2ad-28e6-72ea-aa2c-7086a46cc312",
  type: "page-type/temper-web-phrase",
  slug: "watcher-sync-status-card-connected-stale-data",
  title: "Game data captured{capturedAgo}",
  description:
    "The Watcher reached Temper{contactAgo}, but the newest game data it sent was captured{capturedAgo}. Temper cannot tell from here whether you simply have not played since then, or the add-ons have stopped writing the files the Watcher reads. Play for a few minutes, then check whether the capture time above moves.",
  createdAt: "2026-09-27T11:43:14.150Z",
  updatedAt: "2026-09-27T11:43:22.000Z",
} as const satisfies TemperWebPhrase
