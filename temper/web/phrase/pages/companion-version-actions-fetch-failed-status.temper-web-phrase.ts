import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const companionVersionActionsFetchFailedStatus = {
  id: "01a0e2ad-3165-7fbc-97a1-b44a4d87c20b",
  type: "page-type/temper-web-phrase",
  slug: "companion-version-actions-fetch-failed-status",
  title: "Failed to fetch versions: HTTP {status}",
} as const satisfies TemperWebPhrase
