import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import type { MetricTemplate } from "../metric-template/metric-template.module.code.ts"

export const METRICS_DATA_02: Partial<Record<MetricId, MetricTemplate>> = {
  "break-free-cost": {
    id: "break-free-cost",

    name: "Break Free Cost",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_CC_BREAK_COST",
    esoStatValuePart: "flat",
    valueType: "integer",
    polarity: "lower-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        { type: "sum", effectType: "integer" },
        { type: "product", effectType: "fractional-change" },
      ],
    },
  },
  "break-free-duration": {
    id: "break-free-duration",

    name: "Break Free Duration",
    valueType: "number-per-second",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        { type: "constant", value: 7 },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "sum", effectType: "fractional-change" },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "sum", effectType: "fractional-change" },
          ],
        },
      ],
    },
  },
  "burning-damage": {
    id: "burning-damage",

    name: "Burning Damage",
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
                { type: "constant", value: 0.016 },
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
                { type: "constant", value: 0.168 },
                {
                  type: "max",
                  operands: [
                    { type: "metric-refs", metricIds: ["status-flame-spell-damage"] },
                    { type: "metric-refs", metricIds: ["status-flame-weapon-damage"] },
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
            { type: "metric-refs", metricIds: ["damage-done-flame"] },
            { type: "metric-refs", metricIds: ["damage-done-dot"] },
            { type: "metric-refs", metricIds: ["damage-done-single-target"] },
            { type: "metric-refs", metricIds: ["damage-done-base"] },
          ],
        },
      ],
    },
  },
  "chilled-damage": {
    id: "chilled-damage",

    name: "Chilled Damage",
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
                    { type: "metric-refs", metricIds: ["status-frost-spell-damage"] },
                    { type: "metric-refs", metricIds: ["status-frost-weapon-damage"] },
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
            { type: "metric-refs", metricIds: ["damage-done-frost"] },
            { type: "metric-refs", metricIds: ["damage-done-direct"] },
            { type: "metric-refs", metricIds: ["damage-done-single-target"] },
            { type: "metric-refs", metricIds: ["damage-done-base"] },
          ],
        },
      ],
    },
  },
  "concussion-damage": {
    id: "concussion-damage",

    name: "Concussion Damage",
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
                    { type: "metric-refs", metricIds: ["status-shock-spell-damage"] },
                    { type: "metric-refs", metricIds: ["status-shock-weapon-damage"] },
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
            { type: "metric-refs", metricIds: ["damage-done-shock"] },
            { type: "metric-refs", metricIds: ["damage-done-direct"] },
            { type: "metric-refs", metricIds: ["damage-done-single-target"] },
            { type: "metric-refs", metricIds: ["damage-done-base"] },
          ],
        },
      ],
    },
  },
  "constitution": {
    id: "constitution",

    name: "Constitution",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        { type: "constant", value: 108 },
        { type: "constant", value: 7 },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "sum", effectType: "fractional-change" },
          ],
        },
      ],
    },
  },
  "critical-damage": {
    id: "critical-damage",

    name: "Critical Damage",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_CRITICAL_DAMAGE",
    esoStatValuePart: "percent",
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
  "critical-damage-spell": {
    id: "critical-damage-spell",

    name: "Spell Critical Damage",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    formula: {
      type: "multiply",
      operands: [
        {
          type: "add",
          operands: [
            {
              type: "sum",
              effectType: "fractional-change",
            },
            { type: "constant", value: 0.5 },
          ],
        },
        {
          type: "add",
          operands: [{ type: "constant", value: 1 }],
        },
      ],
    },
    fullyImplemented: true,
  },
  "critical-damage-taken": {
    id: "critical-damage-taken",

    name: "Critical Damage Taken",
    valueType: "fractional-change",
    polarity: "lower-is-better",
    formula: {
      type: "add",
      operands: [
        { type: "metric-refs", metricIds: ["target-critical-damage"] },
        {
          type: "multiply",
          operands: [
            { type: "constant", value: -1 },
            {
              type: "metric-refs",
              metricIds: ["resistance-critical"],
              convertRatingToChance: true,
            },
          ],
        },
      ],
    },
    fullyImplemented: true,
  },
  "critical-damage-weapon": {
    id: "critical-damage-weapon",

    name: "Weapon Critical Damage",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    formula: {
      type: "multiply",
      operands: [
        {
          type: "add",
          operands: [
            {
              type: "sum",
              effectType: "fractional-change",
            },
            { type: "constant", value: 0.5 },
          ],
        },
        {
          type: "add",
          operands: [{ type: "constant", value: 1 }],
        },
      ],
    },
    fullyImplemented: true,
  },
  "critical-rating": {
    id: "critical-rating",

    name: "Critical Rating",
    category: "base",
    esoStatConstantName: "STAT_CRITICAL_CHANCE",
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
  "critical-rating-spell": {
    id: "critical-rating-spell",

    name: "Spell Critical Rating",
    category: "base",
    esoStatConstantName: "STAT_SPELL_CRITICAL",
    valueType: "rating",
    divisor: 21912,
    cap: 1,
    polarity: "higher-is-better",
    formula: {
      type: "sum",
      effectType: "integer",
    },
    fullyImplemented: true,
  },
  "critical-rating-weapon": {
    id: "critical-rating-weapon",

    name: "Weapon Critical Rating",
    category: "base",
    esoStatConstantName: "STAT_CRITICAL_STRIKE",
    valueType: "rating",
    divisor: 21912,
    cap: 1,
    polarity: "higher-is-better",
    formula: {
      type: "sum",
      effectType: "integer",
    },
    fullyImplemented: true,
  },
  "damage-done-aoe": {
    id: "damage-done-aoe",

    name: "Damage Done (AOE)",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-done-arena": {
    id: "damage-done-arena",

    name: "Damage Done (Arena)",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-done-base": {
    id: "damage-done-base",

    name: "Damage Done",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-done-bleed": {
    id: "damage-done-bleed",

    name: "Damage Done (Bleed)",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_BLEED_DAMAGE",
    esoStatValuePart: "percent",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-done-bow": {
    id: "damage-done-bow",

    name: "Damage Done (Bow)",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-done-channeled": {
    id: "damage-done-channeled",

    name: "Damage Done (Channeled)",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-done-direct": {
    id: "damage-done-direct",

    name: "Damage Done (Direct)",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-done-disease": {
    id: "damage-done-disease",

    name: "Damage Done (Disease)",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_DISEASE_DAMAGE",
    esoStatValuePart: "percent",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
}
