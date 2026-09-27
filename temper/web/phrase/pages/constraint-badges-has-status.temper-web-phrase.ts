import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const constraintBadgesHasStatus = {
  id: "01a0e2a3-992f-7624-bef0-a94af521e5d8",
  type: "page-type/temper-web-phrase",
  slug: "constraint-badges-has-status",
  title: "Has {status}",
} as const satisfies TemperWebPhrase
