import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const constraintBadgesMeterRange = {
  id: "01a0e2a3-992f-7b4c-baf4-8fa624eef11a",
  type: "page-type/temper-web-phrase",
  slug: "constraint-badges-meter-range",
  title: "{min}-{max}m",
} as const satisfies TemperWebPhrase
