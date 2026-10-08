import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneAoe = {
  id: "01a0de67-c008-7524-8d8c-36179a1d305c",
  type: "page-type/temper-metric",
  slug: "damage-done-aoe",
  title: "Damage Done (AOE)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.456Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
