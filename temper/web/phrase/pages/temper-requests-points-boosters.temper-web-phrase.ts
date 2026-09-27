import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const temperRequestsPointsBoosters = {
  id: "01a0e2a6-e1dd-72fc-a1bf-0373cb12f3c8",
  type: "page-type/temper-web-phrase",
  slug: "temper-requests-points-boosters",
  title: "{points} points from {boosters} boosters",
} as const satisfies TemperWebPhrase
