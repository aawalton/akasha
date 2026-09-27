import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherRunStatusCardNeverReported = {
  id: "01a0e2aa-8bf0-7f26-9efa-ee1b3fbf33e5",
  type: "page-type/temper-web-phrase",
  slug: "watcher-run-status-card-never-reported",
  title: "The Watcher has not reported a sync run",
  description:
    "Temper has no account of what the Watcher tried, so it cannot say whether anything is working. A Watcher reports after it does its first work, so if you have just linked, this is expected — reload this page in a few minutes. If it still says this later, the Watcher is not running on your computer, whatever the link told you.",
} as const satisfies TemperWebPhrase
