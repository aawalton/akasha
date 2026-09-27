import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const itemTooltipCooldown = {
  id: "01a0e2b3-6b63-7074-b5db-b80340b73d52",
  type: "page-type/temper-web-phrase",
  slug: "item-tooltip-cooldown",
  title: "Cooldown: {seconds}s",
} as const satisfies TemperWebPhrase
