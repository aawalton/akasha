import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const formatTimeAgoDays = {
  id: "01a0e2a9-ae55-7f6d-8d10-f1a219a61bfe",
  type: "page-type/temper-web-phrase",
  slug: "format-time-ago-days",
  title: "{count} days ago",
} as const satisfies TemperWebPhrase
