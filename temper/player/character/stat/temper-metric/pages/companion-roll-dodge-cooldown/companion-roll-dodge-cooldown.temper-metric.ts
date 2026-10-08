import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionRollDodgeCooldown = {
  id: "01a0df07-1cd5-76dc-8eb4-4113f8b9bd4c",
  type: "page-type/temper-metric",
  slug: "companion-roll-dodge-cooldown",
  title: "Roll Dodge CD",
  subject: "companion",
  valueType: "integer",
  formula: "ts",
  createdAt: "2026-09-26T18:43:00.437Z",
  updatedAt: "2026-09-26T18:43:39.000Z",
} as const satisfies TemperMetric
