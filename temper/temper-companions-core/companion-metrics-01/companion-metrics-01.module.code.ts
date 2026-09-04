import type { CompanionMetricTemplate } from "../companion-metric-template/companion-metric-template.module.code.ts"

export const COMPANION_METRICS_01 = {
  "companion-effective-damage": {
    id: "companion-effective-damage",
    name: "Effective Power",
    valueType: "integer",
    formula: {
      type: "multiply",
      operands: [
        { type: "metric-ref", metricId: "companion-tooltip-weapon-damage" },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            {
              type: "multiply",
              operands: [
                {
                  type: "metric-ref",
                  metricId: "companion-critical-chance",
                  convertRatingToChance: true,
                },
                { type: "metric-ref", metricId: "companion-critical-damage" },
              ],
            },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            {
              type: "multiply",
              operands: [
                {
                  type: "metric-ref",
                  metricId: "companion-target-remaining-armor",
                  convertRatingToChance: true,
                },
                { type: "constant", value: -1 },
              ],
            },
          ],
        },
      ],
    },
  },
  "companion-effective-healing": {
    id: "companion-effective-healing",
    name: "Healing",
    valueType: "integer",
    formula: {
      type: "multiply",
      operands: [
        { type: "metric-ref", metricId: "companion-tooltip-weapon-healing" },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            {
              type: "multiply",
              operands: [
                {
                  type: "metric-ref",
                  metricId: "companion-critical-chance",
                  convertRatingToChance: true,
                },
                { type: "metric-ref", metricId: "companion-critical-healing" },
              ],
            },
          ],
        },
      ],
    },
  },
  "companion-effective-toughness": {
    id: "companion-effective-toughness",
    name: "Effective Health",
    valueType: "integer",
    formula: {
      type: "divide",
      operands: [
        {
          type: "multiply",
          operands: [
            { type: "metric-ref", metricId: "companion-health-maximum" },
            {
              type: "add",
              operands: [
                { type: "constant", value: 1 },
                {
                  type: "metric-ref",
                  metricId: "companion-armor",
                  convertRatingToChance: true,
                },
              ],
            },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "metric-ref", metricId: "companion-damage-taken" },
          ],
        },
      ],
    },
  },
  "companion-healing-done": {
    id: "companion-healing-done",
    name: "Healing Done",
    valueType: "fractional-change",
    effectType: "fractional-change",
  },
  "companion-healing-received": {
    id: "companion-healing-received",
    name: "Healing Received",
    valueType: "fractional-change",
    effectType: "fractional-change",
  },
  "companion-health-maximum": {
    id: "companion-health-maximum",
    name: "Maximum Health",
    valueType: "integer",
    formula: {
      type: "multiply",
      operands: [
        { type: "sum", metricId: "companion-health-maximum", effectType: "integer" },
        { type: "product", metricId: "companion-health-maximum", effectType: "fractional-change" },
      ],
    },
  },
  "companion-health-recovery": {
    id: "companion-health-recovery",
    name: "Health Recovery",
    valueType: "fractional-change",
    effectType: "fractional-change",
  },
  "companion-hps-direct": {
    id: "companion-hps-direct",
    name: "Direct Healing Per Second",
    valueType: "integer",
  },
  "companion-hps-hot": {
    id: "companion-hps-hot",
    name: "HoT Healing Per Second",
    valueType: "integer",
  },
  "companion-hps-shield": {
    id: "companion-hps-shield",
    name: "Shield Healing Per Second",
    valueType: "integer",
  },
  "companion-hps-total": {
    id: "companion-hps-total",
    name: "Healing Per Second",
    valueType: "integer",
    formula: {
      type: "add",
      operands: [
        { type: "metric-ref", metricId: "companion-hps-direct" },
        { type: "metric-ref", metricId: "companion-hps-hot" },
        { type: "metric-ref", metricId: "companion-hps-shield" },
      ],
    },
  },
  "companion-penetration": {
    id: "companion-penetration",
    name: "Penetration",
    valueType: "integer",
    effectType: "integer",
  },
  "companion-roll-dodge-cooldown": {
    id: "companion-roll-dodge-cooldown",
    name: "Roll Dodge CD",
    valueType: "integer",
    formula: {
      type: "multiply",
      operands: [
        { type: "sum", metricId: "companion-roll-dodge-cooldown", effectType: "integer" },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            {
              type: "sum",
              metricId: "companion-roll-dodge-cooldown",
              effectType: "fractional-change",
            },
          ],
        },
      ],
    },
  },
  "companion-score": {
    id: "companion-score",
    name: "Score",
    valueType: "integer",
    formula: {
      type: "role-sum",
      operands: [
        { role: "dps", metricRef: "companion-dps-total" },
        { role: "healer", metricRef: "companion-hps-total" },
        { role: "tank", metricRef: "companion-tps-total", scale: 0.1 },
        { role: "support", metricRef: "companion-support-dps" },
        { role: "support", metricRef: "companion-support-tps", scale: 0.1 },
      ],
    },
  },
  "companion-sps-ally": {
    id: "companion-sps-ally",
    name: "Ally Shielding Per Second",
    valueType: "integer",
  },
} satisfies Record<string, CompanionMetricTemplate>
