import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haWerewolf = {
  id: "01a0de67-c00a-72cf-b807-e6a1ea977006",
  type: "page-type/temper-metric",
  slug: "ha-werewolf",
  title: "HA Werewolf",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.458Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
