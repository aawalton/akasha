import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const temperRequestsPointBooster = {
  id: "01a0e2a6-e1dd-758e-a0d1-707af7930148",
  type: "page-type/temper-web-phrase",
  slug: "temper-requests-point-booster",
  title: "{points} point from {boosters} booster",
} as const satisfies TemperWebPhrase
