import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherRunStatusCardWorking = {
  id: "01a0e2aa-8bf0-7b75-b034-1a905cb9485f",
  type: "page-type/temper-web-phrase",
  slug: "watcher-run-status-card-working",
  title: "Everything the Watcher tried succeeded{ago}",
  description:
    "The Watcher read the add-on files it looks for and delivered all {count} of them. This describes that run, not this moment — it reports each time it does work, so the line above will age while nothing is wrong.",
} as const satisfies TemperWebPhrase
