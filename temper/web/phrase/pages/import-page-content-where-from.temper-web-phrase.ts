import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const importPageContentWhereFrom = {
  id: "01a0e2a7-edf8-7651-abac-d90754c261f0",
  type: "page-type/temper-web-phrase",
  slug: "import-page-content-where-from",
  title: "Where the file comes from",
  description:
    "{fromAddOn} ESO does not write it on its own — {addOn} creates it while you play. If that add-on is not installed in your game, the file below will not exist on your computer and there is nothing to upload.",
} as const satisfies TemperWebPhrase
