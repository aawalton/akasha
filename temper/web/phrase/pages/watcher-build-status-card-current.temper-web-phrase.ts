import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherBuildStatusCardCurrent = {
  id: "01a0e2a8-9c89-7547-8938-0d0c5fd71528",
  type: "page-type/temper-web-phrase",
  slug: "watcher-build-status-card-current",
  title: "Watcher was up to date{ago}",
  description:
    "The last time your Watcher reported in, it was running the build Temper currently serves. It updates itself, so it should stay that way — but this line describes that moment, not right now.",
} as const satisfies TemperWebPhrase
