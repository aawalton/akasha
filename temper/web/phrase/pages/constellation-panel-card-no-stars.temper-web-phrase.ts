import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const constellationPanelCardNoStars = {
  id: "01a0e2a1-fbbd-7f08-9347-89dc4fff62c2",
  type: "page-type/temper-web-phrase",
  slug: "constellation-panel-card-no-stars",
  title: "No stars slotted. Click the button below to add up to {count} stars.",
} as const satisfies TemperWebPhrase
