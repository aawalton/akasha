import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionHealingReceived = {
  id: "01a0df07-1cd5-748f-988f-c3e672b6165a",
  type: "page-type/temper-metric",
  slug: "companion-healing-received",
  title: "Healing Received",
  subject: "companion",
  valueType: "fractional-change",
  effectType: "fractional-change",
  createdAt: "2026-09-26T18:43:00.437Z",
  updatedAt: "2026-09-26T18:43:39.000Z",
} as const satisfies TemperMetric
