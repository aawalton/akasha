import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionRollDodgeCooldown = {
  id: "01a0df07-1cd5-76dc-8eb4-4113f8b9bd4c",
  type: "page-type/temper-metric",
  slug: "companion-roll-dodge-cooldown",
  title: "Roll Dodge CD",
  subject: "companion",
  valueType: "integer",
  formula: "ts",
} as const satisfies TemperMetric
