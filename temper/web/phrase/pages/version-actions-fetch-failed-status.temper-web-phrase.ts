import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const versionActionsFetchFailedStatus = {
  id: "01a0e2b4-01b5-708e-9b36-27a47a1fde61",
  type: "page-type/temper-web-phrase",
  slug: "version-actions-fetch-failed-status",
  title: "Failed to fetch versions: HTTP {status}",
} as const satisfies TemperWebPhrase
