import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const playerEffectiveLevel = {
  id: "01a0de67-c00b-7e55-b719-3a0104cc67db",
  type: "page-type/temper-metric",
  slug: "player-effective-level",
  title: "Player Effective Level",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
