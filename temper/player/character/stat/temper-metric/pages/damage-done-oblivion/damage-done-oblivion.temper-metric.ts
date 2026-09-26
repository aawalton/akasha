import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneOblivion = {
  id: "01a0de67-c008-7138-9a8b-10ad21fb096b",
  type: "page-type/temper-metric",
  slug: "damage-done-oblivion",
  title: "Damage Done (Oblivion)",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_OBLIVION_DAMAGE",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
