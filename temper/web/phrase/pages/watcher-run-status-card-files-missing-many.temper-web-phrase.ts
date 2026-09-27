import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherRunStatusCardFilesMissingMany = {
  id: "01a0e2aa-8bf0-7a63-a3bb-35e3ff38fd55",
  type: "page-type/temper-web-phrase",
  slug: "watcher-run-status-card-files-missing-many",
  title: "The Watcher could not find {count} files it reads{ago}",
} as const satisfies TemperWebPhrase
