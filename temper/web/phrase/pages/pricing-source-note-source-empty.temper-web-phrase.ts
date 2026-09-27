import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const pricingSourceNoteSourceEmpty = {
  id: "01a0e2a4-a50c-762b-9d4f-bf105dce5a51",
  type: "page-type/temper-web-phrase",
  slug: "pricing-source-note-source-empty",
  title: "Item values are missing",
  description:
    "Item values are missing — Tamriel Trade Centre was running during your last sync but priced none of your items. Its price tables come from the separate Tamriel Trade Centre desktop client rather than the add-on itself, so if that has not run, the add-on loads with nothing to price from. Until then only vendor prices are counted, and your totals are far too low.",
} as const satisfies TemperWebPhrase
