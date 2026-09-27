import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const temperRequestsPointsBooster = {
  id: "01a0e2a6-e1dd-77e1-bd4b-6daddf12fc9a",
  type: "page-type/temper-web-phrase",
  slug: "temper-requests-points-booster",
  title: "{points} points from {boosters} booster",
} as const satisfies TemperWebPhrase
