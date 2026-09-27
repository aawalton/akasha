import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherPageContentStepLogin = {
  id: "01a0e2b2-5f0d-79cf-9e7b-96c41ea28ae0",
  type: "page-type/temper-web-phrase",
  slug: "watcher-page-content-step-login",
  title:
    "Log in to a character once, so the game writes its SavedVariables files. There is nothing to sync until this has happened.",
} as const satisfies TemperWebPhrase
