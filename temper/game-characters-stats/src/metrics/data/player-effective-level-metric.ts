import type { MetricTemplate } from "../metric-template"

export const playerEffectiveLevelMetric = {
  id: "player-effective-level",

  name: "Player Effective Level",
  valueType: "integer",
  polarity: "higher-is-better",
  formula: {
    type: "constant",
    value: 66,
  },
  fullyImplemented: true,
} satisfies MetricTemplate
