import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const temperRequestsPointBoosters = {
  id: "01a0e2a6-e1dd-7367-b299-6c8cbf5645e2",
  type: "page-type/temper-web-phrase",
  slug: "temper-requests-point-boosters",
  title: "{points} point from {boosters} boosters",
} as const satisfies TemperWebPhrase
