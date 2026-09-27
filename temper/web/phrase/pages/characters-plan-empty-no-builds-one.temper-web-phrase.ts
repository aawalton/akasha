import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const charactersPlanEmptyNoBuildsOne = {
  id: "01a0e2a6-e26e-7330-8c7a-91eb0a528084",
  type: "page-type/temper-web-phrase",
  slug: "characters-plan-empty-no-builds-one",
  title: "One character with no build",
  description:
    "Temper has {count} character for this account. Planning compares a character's current build against a target, and none of them has a build attached yet — importing characters does not attach one, so importing again will not change this.",
} as const satisfies TemperWebPhrase
