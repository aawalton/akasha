import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const versionActionsFetchFailed = {
  id: "01a0e2b4-01b5-7fc6-a4c5-30b49d974a7c",
  type: "page-type/temper-web-phrase",
  slug: "version-actions-fetch-failed",
  title: "Failed to fetch versions: {reason}",
} as const satisfies TemperWebPhrase
