import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const weaponCardRemove = {
  id: "01a0e2a2-e7d2-78a2-804e-1579a98e6faa",
  type: "page-type/temper-web-phrase",
  slug: "weapon-card-remove",
  title: "Remove {name}",
} as const satisfies TemperWebPhrase
