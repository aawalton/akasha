import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const companionSkillCardCost = {
  id: "01a0e2d0-d2fa-76e8-b628-d23aa0997fa7",
  type: "page-type/temper-web-phrase",
  slug: "companion-skill-card-cost",
  title: "{amount} {resource}",
} as const satisfies TemperWebPhrase
