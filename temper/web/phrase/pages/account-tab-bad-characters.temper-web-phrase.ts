import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const accountTabBadCharacters = {
  id: "01a0e2a4-24ed-75b4-bc31-1ae542432d14",
  type: "page-type/temper-web-phrase",
  slug: "account-tab-bad-characters",
  title: "Letters, numbers, and hyphens only (no leading/trailing hyphens)",
} as const satisfies TemperWebPhrase
