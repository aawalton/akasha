import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const companionStatsPanelNoStats = {
  id: "01a0e2b9-c5b1-7f3e-9be0-b59692c3483c",
  type: "page-type/temper-web-phrase",
  slug: "companion-stats-panel-no-stats",
  title: "No stats returned",
  description:
    "The stat calculation finished and returned nothing — not even the base stats every companion starts with. No build setting can cause that, so it points at Temper's stat data rather than at your companion.",
} as const satisfies TemperWebPhrase
