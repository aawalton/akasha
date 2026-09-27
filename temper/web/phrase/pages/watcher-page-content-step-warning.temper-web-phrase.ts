import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherPageContentStepWarning = {
  id: "01a0e2b2-5f0d-71d9-84ae-296e2e17ec42",
  type: "page-type/temper-web-phrase",
  slug: "watcher-page-content-step-warning",
  title:
    "If Windows warns about an unrecognized app, choose {choice} — the Watcher simply isn't signed yet.",
} as const satisfies TemperWebPhrase
