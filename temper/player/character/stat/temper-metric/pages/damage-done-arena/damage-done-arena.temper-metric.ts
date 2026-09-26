import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneArena = {
  id: "01a0de67-c008-72eb-8b44-e3003292867e",
  type: "page-type/temper-metric",
  slug: "damage-done-arena",
  title: "Damage Done (Arena)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
