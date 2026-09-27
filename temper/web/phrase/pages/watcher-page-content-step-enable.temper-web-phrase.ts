import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherPageContentStepEnable = {
  id: "01a0e2b2-5f0d-7ee3-904b-185bd38d0165",
  type: "page-type/temper-web-phrase",
  slug: "watcher-page-content-step-enable",
  title: "How to turn the add-ons on",
  description:
    "Start ESO and turn the add-ons on at {menu}, ticking {outOfDate} if ours are listed as out of date — the versions we declare can lag a fresh ESO patch. An add-on that is installed but not enabled writes nothing, and looks exactly like one that was never installed.",
} as const satisfies TemperWebPhrase
