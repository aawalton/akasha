import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDonePlayers = {
  id: "01a0de67-c009-738a-b91a-5089f3d8b974",
  type: "page-type/temper-metric",
  slug: "damage-done-players",
  title: "Damage Done (Players)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
