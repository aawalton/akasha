import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageTakenArena = {
  id: "01a0de67-c009-7a6e-89bc-71f9ce1a360e",
  type: "page-type/temper-metric",
  slug: "damage-taken-arena",
  title: "Damage Taken (Arena)",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
