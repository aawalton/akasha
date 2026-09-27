import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const companionsPlanTabNoAttachedBuilds = {
  id: "01a0e2bf-b444-739c-bf48-fb17ca812e97",
  type: "page-type/temper-web-phrase",
  slug: "companions-plan-tab-no-attached-builds",
  title: "No builds attached to your companions",
  description:
    "Planning compares a companion's current build against a target, and none of your companions has a build attached yet. Importing from the game does not attach one, so importing again will not change this.",
} as const satisfies TemperWebPhrase
