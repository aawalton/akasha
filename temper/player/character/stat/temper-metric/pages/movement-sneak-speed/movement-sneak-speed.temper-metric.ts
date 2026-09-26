import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const movementSneakSpeed = {
  id: "01a0de67-c00b-719b-9a30-78ffea8ff866",
  type: "page-type/temper-metric",
  slug: "movement-sneak-speed",
  title: "Sneak Speed",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_SNEAK_SPEED_REDUCTION",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
