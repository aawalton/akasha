import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherPageContentManual = {
  id: "01a0e2b2-5f0c-77f7-af60-271719bf243b",
  type: "page-type/temper-web-phrase",
  slug: "watcher-page-content-manual",
  title: "The manual upload",
  description:
    "You can {link} instead, for your characters, companions and completion. It works on any operating system, but you'll need to repeat it whenever you want Temper to see fresh data — and it needs the same Temper ESO add-ons, since they are what create the file you would be uploading. Your inventory reaches Temper through the Watcher and no other way.",
} as const satisfies TemperWebPhrase
