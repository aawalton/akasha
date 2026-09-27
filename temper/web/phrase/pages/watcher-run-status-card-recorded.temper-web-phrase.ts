import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherRunStatusCardRecorded = {
  id: "01a0e2aa-8bf0-7c3a-80ff-41b3c05d5829",
  type: "page-type/temper-web-phrase",
  slug: "watcher-run-status-card-recorded",
  title: "Temper recorded: {detail}",
} as const satisfies TemperWebPhrase
