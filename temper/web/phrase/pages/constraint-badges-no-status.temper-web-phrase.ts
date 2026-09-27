import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const constraintBadgesNoStatus = {
  id: "01a0e2a3-992f-75e7-92dc-08a4c645bc6b",
  type: "page-type/temper-web-phrase",
  slug: "constraint-badges-no-status",
  title: "No {status}",
} as const satisfies TemperWebPhrase
