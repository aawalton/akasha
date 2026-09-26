import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const movementSwimSpeed = {
  id: "01a0de67-c00b-7636-bc11-15d3d56885f3",
  type: "page-type/temper-metric",
  slug: "movement-swim-speed",
  title: "Swim Speed",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
