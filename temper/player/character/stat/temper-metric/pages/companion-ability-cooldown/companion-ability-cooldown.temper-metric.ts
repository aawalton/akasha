import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionAbilityCooldown = {
  id: "01a0df07-1cd4-76db-b6f6-74b5d8b0c4f8",
  type: "page-type/temper-metric",
  slug: "companion-ability-cooldown",
  title: "Cooldown",
  subject: "companion",
  valueType: "fractional-change",
  effectType: "fractional-change",
  createdAt: "2026-09-26T18:43:00.436Z",
  updatedAt: "2026-09-26T18:43:39.000Z",
} as const satisfies TemperMetric
