import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const completionPageEmptySignedInOnly = {
  id: "01a0e29d-a745-72ea-88bc-5b8db1b09515",
  type: "page-type/temper-web-phrase",
  slug: "completion-page-empty-signed-in-only",
  title: "Only your own completion data loads",
  description:
    "Temper only loads the completion data of the account you are signed in as, so a link to another player's completion shows nothing here even when that player has data of their own. If this is your own link, import your ESO data or reload the page.",
} as const satisfies TemperWebPhrase
