import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const constraintBadgesWeapon = {
  id: "01a0e2a3-992f-739c-92b0-547203ee9b72",
  type: "page-type/temper-web-phrase",
  slug: "constraint-badges-weapon",
  title: "{weapon} Weapon",
} as const satisfies TemperWebPhrase
