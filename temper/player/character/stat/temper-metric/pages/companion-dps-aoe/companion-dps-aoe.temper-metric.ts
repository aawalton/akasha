import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionDpsAoe = {
  id: "01a0df07-1cd5-7ec7-b376-6fc2a8143ffa",
  type: "page-type/temper-metric",
  slug: "companion-dps-aoe",
  title: "Per-Target Damage Per Second",
  subject: "companion",
  valueType: "integer",
} as const satisfies TemperMetric
