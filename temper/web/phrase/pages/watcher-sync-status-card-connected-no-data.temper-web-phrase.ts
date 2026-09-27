import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherSyncStatusCardConnectedNoData = {
  id: "01a0e2ad-28e6-7d90-b062-8711c841f470",
  type: "page-type/temper-web-phrase",
  slug: "watcher-sync-status-card-connected-no-data",
  title: "Linked, but no game data has arrived",
  description:
    "The Watcher linked to this account{connectedAgo}, and Temper has received nothing since — no characters and no inventory. The most common cause is the Temper ESO add-ons not being installed in your game, since the Watcher only reads the files those add-ons write. If they are installed and this still shows nothing, the problem is not your setup.",
} as const satisfies TemperWebPhrase
