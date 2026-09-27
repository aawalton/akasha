import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherBuildStatusCardNeverReported = {
  id: "01a0e2a8-9c89-7757-97e7-990cf44fe10d",
  type: "page-type/temper-web-phrase",
  slug: "watcher-build-status-card-never-reported",
  title: "Watcher has not reported its version",
  description:
    "Temper has never received a run report from this Watcher, so it cannot tell which build you are on. Either the Watcher has not completed a sync yet, or it predates version reporting and cannot say what it is running. Neither means it is broken — but neither confirms it is working.",
} as const satisfies TemperWebPhrase
