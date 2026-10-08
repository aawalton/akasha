import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const potionCooldown = {
  id: "01a0de67-c00b-77da-9041-b51bc678b5d7",
  type: "page-type/temper-metric",
  slug: "potion-cooldown",
  title: "Potion Cooldown",
  valueType: "integer",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.459Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
