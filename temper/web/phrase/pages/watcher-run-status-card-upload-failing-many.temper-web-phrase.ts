import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherRunStatusCardUploadFailingMany = {
  id: "01a0e2aa-8bf0-7931-a277-d75b4b71c29b",
  type: "page-type/temper-web-phrase",
  slug: "watcher-run-status-card-upload-failing-many",
  title: "The Watcher could not deliver {count} uploads{ago}",
} as const satisfies TemperWebPhrase
