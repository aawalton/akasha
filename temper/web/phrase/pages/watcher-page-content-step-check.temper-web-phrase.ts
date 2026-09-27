import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherPageContentStepCheck = {
  id: "01a0e2b2-5f0d-7f52-944f-6d5188aa9cfe",
  type: "page-type/temper-web-phrase",
  slug: "watcher-page-content-step-check",
  title:
    "Come back to this page and check the status at the top. It tells you whether your data actually reached Temper — linking on its own does not mean anything has arrived.",
} as const satisfies TemperWebPhrase
