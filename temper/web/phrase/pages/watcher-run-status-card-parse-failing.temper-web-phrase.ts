import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherRunStatusCardParseFailing = {
  id: "01a0e2aa-8bf0-7ff8-84c8-e804d7cbaeb1",
  type: "page-type/temper-web-phrase",
  slug: "watcher-run-status-card-parse-failing",
  title: "Why the Watcher can fail to read a file",
  description:
    "The file for {failing} exists and the Watcher could not make sense of it. That is more likely our bug than anything you did — the add-on may be writing a shape Temper does not expect, or the file was captured mid-write. Please tell us.{recorded}",
} as const satisfies TemperWebPhrase
