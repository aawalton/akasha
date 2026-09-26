import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const defenseSpellMitigation = {
  id: "01a0de67-c009-7ca6-87fd-688ce46eeac3",
  type: "page-type/temper-metric",
  slug: "defense-spell-mitigation",
  title: "Defense Spell Mitigation",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_SPELL_RESIST",
  esoStatValuePart: "percent",
  fullyImplemented: false,
  formula: "ts",
} as const satisfies TemperMetric
