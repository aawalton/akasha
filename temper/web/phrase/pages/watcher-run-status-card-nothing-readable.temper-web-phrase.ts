import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherRunStatusCardNothingReadable = {
  id: "01a0e2aa-8bf0-7079-b95d-f1d0a7bea4b1",
  type: "page-type/temper-web-phrase",
  slug: "watcher-run-status-card-nothing-readable",
  title: "Temper cannot tell what the Watcher's last run did",
  description:
    "A report arrived, but nothing in it says what happened — either the Watcher had no work to do, or it is an older build that reports less than Temper now reads. Neither means it is broken, and neither confirms it is working.",
} as const satisfies TemperWebPhrase
