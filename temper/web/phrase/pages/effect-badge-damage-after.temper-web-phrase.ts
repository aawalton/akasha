import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const effectBadgeDamageAfter = {
  id: "01a0e2aa-b3e1-7dc6-b063-ffabac088167",
  type: "page-type/temper-web-phrase",
  slug: "effect-badge-damage-after",
  title: "{type} Damage After {seconds}s",
} as const satisfies TemperWebPhrase
