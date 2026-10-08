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
  createdAt: "2026-09-26T15:48:56.459Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
