import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import type { MetricTemplate } from "../metric-template/metric-template.module.code.ts"

export const METRICS_DATA_15: Partial<Record<MetricId, MetricTemplate>> = {
  "sundered-damage": {
    id: "sundered-damage",

    name: "Sundered Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        {
          type: "add",
          operands: [
            {
              type: "floor-multiply",
              operands: [
                { type: "constant", value: 0.008 },
                {
                  type: "max",
                  operands: [
                    { type: "metric-refs", metricIds: ["magicka-maximum"] },
                    { type: "metric-refs", metricIds: ["stamina-maximum"] },
                  ],
                },
              ],
            },
            {
              type: "floor-multiply",
              operands: [
                { type: "constant", value: 0.084 },
                {
                  type: "max",
                  operands: [
                    { type: "metric-refs", metricIds: ["status-physical-spell-damage"] },
                    { type: "metric-refs", metricIds: ["status-physical-weapon-damage"] },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "metric-refs", metricIds: ["damage-done-physical"] },
            { type: "metric-refs", metricIds: ["damage-done-direct"] },
            { type: "metric-refs", metricIds: ["damage-done-single-target"] },
            { type: "metric-refs", metricIds: ["damage-done-base"] },
          ],
        },
      ],
    },
  },
  "synergy-effectiveness": {
    id: "synergy-effectiveness",

    name: "Synergy Effectiveness",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "fractional-change",
        },
      ],
    },
    fullyImplemented: true,
  },
  "target-armor": {
    id: "target-armor",

    name: "Target Armor",
    valueType: "integer",
    polarity: "higher-is-better",
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "integer",
        },
      ],
    },
    fullyImplemented: true,
  },
  "target-attack-bonus": {
    id: "target-attack-bonus",

    name: "Target Attack Bonus",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "fractional-change",
        },
      ],
    },
  },
  "target-critical-damage-done": {
    id: "target-critical-damage-done",

    name: "Target Critical Damage Done",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "fractional-change",
        },
      ],
    },
  },
  "target-critical-damage": {
    id: "target-critical-damage",

    name: "Target Critical Damage",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "fractional-change",
        },
      ],
    },
  },
  "target-critical-rating": {
    id: "target-critical-rating",

    name: "Target Critical Rating",
    valueType: "rating",
    divisor: 21912,
    cap: 1,
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "integer",
        },
      ],
    },
  },
  "target-critical-resistance": {
    id: "target-critical-resistance",

    name: "Target Critical Resistance",
    valueType: "rating",
    divisor: 5000,
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "integer",
        },
      ],
    },
  },
  "target-damage-done": {
    id: "target-damage-done",

    name: "Target Damage Done",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "fractional-change",
        },
      ],
    },
  },
  "target-damage-taken": {
    id: "target-damage-taken",

    name: "Target Damage Taken",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "fractional-change",
        },
      ],
    },
  },
  "target-damage-taken-poison": {
    id: "target-damage-taken-poison",

    name: "Target Damage Taken (Poison)",
    valueType: "number-per-second",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "number-per-seconds",
        },
      ],
    },
  },
  "target-defense-bonus": {
    id: "target-defense-bonus",

    name: "Target Defense Bonus",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "fractional-change",
        },
      ],
    },
  },
  "target-effective-level": {
    id: "target-effective-level",

    name: "Target Effective Level",
    valueType: "integer",
    polarity: "higher-is-better",
    formula: {
      type: "constant",
      value: 50,
    },
    fullyImplemented: true,
  },
  "target-healing-received": {
    id: "target-healing-received",

    name: "Target Healing Received",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "target-health-recovery": {
    id: "target-health-recovery",
    fullyImplemented: true,

    name: "Target Health Recovery",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "fractional-change",
        },
      ],
    },
  },
  "target-magicka-ability-cost": {
    id: "target-magicka-ability-cost",
    fullyImplemented: true,

    name: "Target Magicka Ability Cost",
    valueType: "fractional-change",
    polarity: "lower-is-better",
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "fractional-change",
        },
      ],
    },
  },
  "target-penetration": {
    id: "target-penetration",

    name: "Target Penetration",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "integer",
        },
      ],
    },
  },
  "target-percent-health": {
    id: "target-percent-health",

    name: "Target Health Percentage",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "fractional-change",
        },
      ],
    },
    fullyImplemented: true,
  },
  "target-physical-debuff": {
    id: "target-physical-debuff",

    name: "Target Physical Debuff",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "integer",
        },
      ],
    },
  },
  "target-power": {
    id: "target-power",

    name: "Target Power",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "integer",
        },
      ],
    },
  },
  "target-resistance": {
    id: "target-resistance",

    name: "Target Resistance",
    valueType: "integer",
    polarity: "higher-is-better",
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "integer",
        },
      ],
    },
    fullyImplemented: true,
  },
  "target-physical-resistance": {
    id: "target-physical-resistance",

    name: "Target Physical Resistance",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "integer",
        },
      ],
    },
  },
  "target-spell-resistance": {
    id: "target-spell-resistance",

    name: "Target Spell Resistance",
    valueType: "integer",
    polarity: "higher-is-better",
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "integer",
        },
      ],
    },
    fullyImplemented: true,
  },
  "target-spell-debuff": {
    id: "target-spell-debuff",

    name: "Target Spell Debuff",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "integer",
        },
      ],
    },
  },
  "target-spell-power": {
    id: "target-spell-power",

    name: "Target Spell Power",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "integer",
        },
      ],
    },
  },
  "target-stamina-ability-cost": {
    id: "target-stamina-ability-cost",
    fullyImplemented: true,

    name: "Target Stamina Ability Cost",
    valueType: "fractional-change",
    polarity: "lower-is-better",
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "fractional-change",
        },
      ],
    },
  },
  "target-ultimate-restoration": {
    id: "target-ultimate-restoration",
    fullyImplemented: true,

    name: "Target Ultimate Restoration",
    valueType: "number-per-second",
    polarity: "higher-is-better",
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "number-per-seconds",
        },
      ],
    },
  },
  "target-weapon-power": {
    id: "target-weapon-power",

    name: "Target Weapon Power",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "integer",
        },
      ],
    },
  },
  "tel-var-gain": {
    id: "tel-var-gain",

    name: "Tel Var Gain",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_TELVAR_BONUS",
    esoStatValuePart: "percent",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "fractional-change",
        },
      ],
    },
    fullyImplemented: true,
  },
  "training": {
    id: "training",

    name: "Training",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
}
