import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const completionCompanionsTabUnsyncedOne = {
  id: "01a0e2c2-fbb5-796f-a0a0-8bf236e62ced",
  type: "page-type/temper-web-phrase",
  slug: "completion-companions-tab-unsynced-one",
  title:
    "Companion levels have synced for {leveled} of {total} companions. The {unleveled} not yet synced is excluded from Companion Level, not counted as zero.",
} as const satisfies TemperWebPhrase
