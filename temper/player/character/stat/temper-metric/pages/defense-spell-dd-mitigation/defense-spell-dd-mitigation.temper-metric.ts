import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const defenseSpellDdMitigation = {
  id: "01a0de67-c009-7e5c-b4c7-bf90bf4be8a0",
  type: "page-type/temper-metric",
  slug: "defense-spell-dd-mitigation",
  title: "Defense Spell Direct Mitigation",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
