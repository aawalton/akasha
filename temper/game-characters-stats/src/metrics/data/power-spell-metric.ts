import { POWER_LEVEL_BASE } from "@temper/shared-formula-framework/base-stat-constants"
import type { MetricTemplate } from "../metric-template"

export const powerSpellMetric = {
  id: "power-spell",

  name: "Spell Power",
  category: "base",
  esoStatConstantName: "STAT_SPELL_POWER",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "add",
    operands: [
      { type: "constant", value: POWER_LEVEL_BASE },
      {
        type: "multiply",
        operands: [
          {
            type: "add",
            operands: [
              {
                type: "sum",
                effectType: "integer",
              },
            ],
          },
          {
            type: "add",
            operands: [
              { type: "constant", value: 1 },
              {
                type: "sum",
                effectType: "fractional-change",
              },
            ],
          },
        ],
      },
    ],
  },
} satisfies MetricTemplate
