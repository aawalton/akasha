import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const buffOrDebuffExplanationDialogNoSource = {
  id: "01a0e2ae-411c-734a-9343-c1b002620c0e",
  type: "page-type/temper-web-phrase",
  slug: "buff-or-debuff-explanation-dialog-no-source",
  title:
    "No skill or potion in this build provides this buff. Some set bonuses grant buffs directly, so check your equipped sets.",
} as const satisfies TemperWebPhrase
