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
  createdAt: "2026-09-26T15:48:56.457Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
