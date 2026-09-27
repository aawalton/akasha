import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const charactersPlanEmptyNoBuildsMany = {
  id: "01a0e2a6-e26e-7af9-9cc1-dc13c00fd002",
  type: "page-type/temper-web-phrase",
  slug: "characters-plan-empty-no-builds-many",
  title: "Characters with no build",
  description:
    "Temper has {count} characters for this account. Planning compares a character's current build against a target, and none of them has a build attached yet — importing characters does not attach one, so importing again will not change this.",
} as const satisfies TemperWebPhrase
