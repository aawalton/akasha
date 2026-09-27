import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const watcherSyncStatusCardNoCharacters = {
  id: "01a0e2ad-28e7-7096-88f3-bca5daca9c76",
  type: "page-type/temper-web-phrase",
  slug: "watcher-sync-status-card-no-characters",
  title: "Game data captured{capturedAgo}",
  description:
    "Your inventory is arriving, but no characters have, so Temper is seeing only part of this account. The Temper ESO add-ons are installed separately, and the one that exports characters may be missing.",
} as const satisfies TemperWebPhrase
