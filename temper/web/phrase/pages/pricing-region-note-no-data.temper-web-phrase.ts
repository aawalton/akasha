import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const pricingRegionNoteNoData = {
  id: "01a0e2a4-a50c-7f76-b486-8e9b06f66dfa",
  type: "page-type/temper-web-phrase",
  slug: "pricing-region-note-no-data",
  title:
    "No market prices for {platform} / {server} yet — market data covers {defaultPlatform} / {defaultServer} only for now. Your region is set in",
} as const satisfies TemperWebPhrase
