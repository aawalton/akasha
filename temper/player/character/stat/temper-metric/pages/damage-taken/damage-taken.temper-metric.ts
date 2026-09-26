import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageTaken = {
  id: "01a0de67-c009-7e55-9f34-a37802ceac6a",
  type: "page-type/temper-metric",
  slug: "damage-taken",
  title: "Damage Taken",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
