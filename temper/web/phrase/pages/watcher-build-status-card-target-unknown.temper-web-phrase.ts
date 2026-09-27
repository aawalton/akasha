import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherBuildStatusCardTargetUnknown = {
  id: "01a0e2a8-9c89-764a-888b-1742583ecda3",
  type: "page-type/temper-web-phrase",
  slug: "watcher-build-status-card-target-unknown",
  title: "Temper cannot tell which build it is serving",
  description:
    "Temper could not read its own current Watcher version, so it has nothing to compare yours against. This is a problem on Temper's side, not with your install, and it means Watcher updates are probably not being served to anyone right now.",
} as const satisfies TemperWebPhrase
