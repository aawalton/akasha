import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherPageContentStepExtract = {
  id: "01a0e2b2-5f0d-79da-a227-78b710dd90d9",
  type: "page-type/temper-web-phrase",
  slug: "watcher-page-content-step-extract",
  title: "Where to extract the add-ons",
  description:
    "Extract everything in the zip into your ESO add-ons folder, {path}. If your Documents folder syncs to OneDrive, the real one is {oneDrivePath} — extracting into the other looks like it worked and changes nothing in game.",
} as const satisfies TemperWebPhrase
