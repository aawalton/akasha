import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherRunStatusCardFilesMissing = {
  id: "01a0e2aa-8bf0-7644-816e-22df0ff45e5b",
  type: "page-type/temper-web-phrase",
  slug: "watcher-run-status-card-files-missing",
  title: "Why files the Watcher reads can be missing",
  description:
    "It found nothing to read for {failing}. That is what an add-on that is not installed, is not ticked on in game, or was extracted into the wrong Documents folder looks like from here — if your Documents folder syncs to OneDrive, the real add-ons folder is the one under OneDrive. Nothing from {failing} can sync until those files exist.{recorded}",
} as const satisfies TemperWebPhrase
