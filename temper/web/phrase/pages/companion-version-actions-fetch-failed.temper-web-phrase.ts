import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const companionVersionActionsFetchFailed = {
  id: "01a0e2ad-3165-764e-b67b-54637fb63b67",
  type: "page-type/temper-web-phrase",
  slug: "companion-version-actions-fetch-failed",
  title: "Failed to fetch versions: {reason}",
} as const satisfies TemperWebPhrase
