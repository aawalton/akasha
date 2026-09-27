import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherBuildStatusCardStale = {
  id: "01a0e2a8-9c89-7159-bb75-15260e165485",
  type: "page-type/temper-web-phrase",
  slug: "watcher-build-status-card-stale",
  title: "Watcher is running an older build{ago}",
  description:
    "Your Watcher last reported a different build than the one Temper now serves. It is meant to update itself automatically, so this usually means its update check cannot reach Temper. Restarting the Watcher makes it check again; if this persists, tell us — the cause is on our side more often than yours.",
} as const satisfies TemperWebPhrase
