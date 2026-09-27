import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const completionCompanionsTabUnsyncedMany = {
  id: "01a0e2c2-fbb5-7f26-99ae-724eafe112eb",
  type: "page-type/temper-web-phrase",
  slug: "completion-companions-tab-unsynced-many",
  title:
    "Companion levels have synced for {leveled} of {total} companions. The {unleveled} not yet synced are excluded from Companion Level, not counted as zero.",
} as const satisfies TemperWebPhrase
