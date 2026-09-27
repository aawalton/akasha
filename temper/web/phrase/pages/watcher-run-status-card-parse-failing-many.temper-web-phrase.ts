import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherRunStatusCardParseFailingMany = {
  id: "01a0e2aa-8bf0-7938-9fe7-b622cd28af39",
  type: "page-type/temper-web-phrase",
  slug: "watcher-run-status-card-parse-failing-many",
  title: "The Watcher could not read {count} files{ago}",
} as const satisfies TemperWebPhrase
