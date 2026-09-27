import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherSyncStatusCardDataWithoutWatcher = {
  id: "01a0e2ad-28e7-71c3-85bd-5b67bf6c1657",
  type: "page-type/temper-web-phrase",
  slug: "watcher-sync-status-card-data-without-watcher",
  title: "Last imported by hand{contactAgo}",
  description:
    "Temper has your data, but no Watcher is linked to this account, so nothing updates on its own.{dataDate} Import again whenever you want Temper to see fresh data.",
} as const satisfies TemperWebPhrase
