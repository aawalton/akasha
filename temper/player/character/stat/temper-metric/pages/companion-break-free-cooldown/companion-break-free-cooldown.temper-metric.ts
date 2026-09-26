import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionBreakFreeCooldown = {
  id: "01a0df07-1cd4-7508-a2c6-bb72cceb49b4",
  type: "page-type/temper-metric",
  slug: "companion-break-free-cooldown",
  title: "Break Free CD",
  subject: "companion",
  valueType: "integer",
  formula: "ts",
} as const satisfies TemperMetric
