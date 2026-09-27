import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherRunStatusCardUploadFailing = {
  id: "01a0e2aa-8bf0-7b78-a13e-d243ca54e247",
  type: "page-type/temper-web-phrase",
  slug: "watcher-run-status-card-upload-failing",
  title: "Why the Watcher can fail to deliver an upload",
  description:
    "It read the data for {failing} and could not get it to Temper, so the failure sits between your Watcher and us rather than in your add-ons. It retries on its next run. If this keeps showing, it is ours to fix.{recorded}",
} as const satisfies TemperWebPhrase
