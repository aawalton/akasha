import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneChanneled = {
  id: "01a0de67-c008-70cb-a771-09d49dc8b02a",
  type: "page-type/temper-metric",
  slug: "damage-done-channeled",
  title: "Damage Done (Channeled)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
