import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const pricingSourceNoteMissingSource = {
  id: "01a0e2a4-a50c-783a-af18-44dc7822f945",
  type: "page-type/temper-web-phrase",
  slug: "pricing-source-note-missing-source",
  title: "Item values are missing",
  description:
    "Item values are missing — Temper prices items with the Tamriel Trade Centre add-on, which was not running during your last sync. Only vendor prices are counted, so your totals are far too low.",
} as const satisfies TemperWebPhrase
