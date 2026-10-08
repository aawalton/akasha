import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const telVarGain = {
  id: "01a0de67-c00d-7283-a718-d656ca06d854",
  type: "page-type/temper-metric",
  slug: "tel-var-gain",
  title: "Tel Var Gain",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_TELVAR_BONUS",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.461Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
