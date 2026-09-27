import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const importPageContentPrices = {
  id: "01a0e2a7-edf8-751c-8a6f-0799714a81ad",
  type: "page-type/temper-web-phrase",
  slug: "import-page-content-prices",
  title: "Item prices",
  description:
    "{pricesNeed} {tradeCentre} is a separate community add-on, not one of ours, and its terms do not allow anyone else to redistribute it — so it is not in that download, and you install it yourself from Minion or esoui.com. It is where Temper gets guild-store prices. TemperItems records whatever prices it finds at scan time, so an inventory captured without it syncs fine and then values your items at vendor prices only — a small fraction of what they are worth.",
} as const satisfies TemperWebPhrase
