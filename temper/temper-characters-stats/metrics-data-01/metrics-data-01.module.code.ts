import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import type { MetricTemplate } from "../metric-template/metric-template.module.code.ts"

export const METRICS_DATA_01: Partial<Record<MetricId, MetricTemplate>> = {
  "alliance-points-gain": {
    id: "alliance-points-gain",

    name: "Alliance Points Gain",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_ALLIANCE_POINTS_BONUS",
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
  "attack-crit-damage-spell": {
    id: "attack-crit-damage-spell",

    name: "Attack Spell Critical Damage",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    formula: {
      type: "add",
      operands: [
        { type: "metric-refs", metricIds: ["critical-damage-spell"] },
        {
          type: "multiply",
          operands: [
            { type: "constant", value: -1 },
            {
              type: "metric-refs",
              metricIds: ["target-critical-resistance"],
              convertRatingToChance: true,
            },
          ],
        },
      ],
    },
    fullyImplemented: true,
  },
  "attack-crit-damage-weapon": {
    id: "attack-crit-damage-weapon",

    name: "Attack Weapon Critical Damage",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    formula: {
      type: "add",
      operands: [
        { type: "metric-refs", metricIds: ["critical-damage-weapon"] },
        {
          type: "multiply",
          operands: [
            { type: "constant", value: -1 },
            {
              type: "metric-refs",
              metricIds: ["target-critical-resistance"],
              convertRatingToChance: true,
            },
          ],
        },
      ],
    },
    fullyImplemented: true,
  },
  "attack-physical-mitigation": {
    id: "attack-physical-mitigation",

    name: "Attack Physical Mitigation",
    valueType: "fractional-change",
    polarity: "lower-is-better",
    formula: {
      type: "multiply",
      operands: [
        {
          type: "max",
          operands: [
            { type: "constant", value: 0 },
            {
              type: "min",
              operands: [
                { type: "constant", value: 1 },
                {
                  type: "multiply",
                  operands: [
                    {
                      type: "add",
                      operands: [
                        {
                          type: "min",
                          operands: [
                            { type: "constant", value: 33000 },
                            { type: "metric-refs", metricIds: ["target-physical-resistance"] },
                          ],
                        },
                        { type: "metric-refs", metricIds: ["target-physical-debuff"] },
                        {
                          type: "multiply",
                          operands: [
                            { type: "constant", value: -1 },
                            { type: "metric-refs", metricIds: ["penetration-physical"] },
                          ],
                        },
                      ],
                    },
                    {
                      type: "divide",
                      operands: [
                        { type: "constant", value: 1 },
                        {
                          type: "multiply",
                          operands: [
                            { type: "metric-refs", metricIds: ["player-effective-level"] },
                            { type: "constant", value: 1000 },
                          ],
                        },
                      ],
                    },
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
            {
              type: "multiply",
              operands: [
                { type: "constant", value: -1 },
                { type: "metric-refs", metricIds: ["target-defense-bonus"] },
              ],
            },
          ],
        },
      ],
    },
    fullyImplemented: true,
  },
  "attack-power": {
    id: "attack-power",

    name: "Attack Power",
    category: "base",
    esoStatConstantName: "STAT_ATTACK_POWER",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: false,
  },
  "attack-spell-mitigation": {
    id: "attack-spell-mitigation",

    name: "Attack Spell Mitigation",
    valueType: "fractional-change",
    polarity: "lower-is-better",
    formula: {
      type: "multiply",
      operands: [
        {
          type: "max",
          operands: [
            { type: "constant", value: 0 },
            {
              type: "min",
              operands: [
                { type: "constant", value: 1 },
                {
                  type: "multiply",
                  operands: [
                    {
                      type: "add",
                      operands: [
                        {
                          type: "min",
                          operands: [
                            { type: "constant", value: 33000 },
                            { type: "metric-refs", metricIds: ["target-spell-resistance"] },
                          ],
                        },
                        { type: "metric-refs", metricIds: ["target-spell-debuff"] },
                        {
                          type: "multiply",
                          operands: [
                            { type: "constant", value: -1 },
                            { type: "metric-refs", metricIds: ["penetration-spell"] },
                          ],
                        },
                      ],
                    },
                    {
                      type: "divide",
                      operands: [
                        { type: "constant", value: 1 },
                        {
                          type: "multiply",
                          operands: [
                            { type: "metric-refs", metricIds: ["player-effective-level"] },
                            { type: "constant", value: 1000 },
                          ],
                        },
                      ],
                    },
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
            {
              type: "multiply",
              operands: [
                { type: "constant", value: -1 },
                { type: "metric-refs", metricIds: ["target-defense-bonus"] },
              ],
            },
          ],
        },
      ],
    },
    fullyImplemented: true,
  },
  "bash-cost": {
    id: "bash-cost",
    fullyImplemented: true,

    name: "Bash Cost",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_BASH_COST",
    esoStatValuePart: "flat",
    valueType: "integer",
    polarity: "lower-is-better",
    formula: {
      type: "multiply",
      operands: [
        { type: "sum", effectType: "integer" },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "sum", categories: ["champion-points"], effectType: "fractional-change" },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "sum", categories: ["skills"], effectType: "fractional-change" },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "sum", categories: ["sets"], effectType: "fractional-change" },
          ],
        },
      ],
    },
  },
  "bash-damage": {
    id: "bash-damage",

    name: "Bash Damage",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_BASH_DAMAGE",
    esoStatValuePart: "flat",
    valueType: "integer",
    polarity: "higher-is-better",
    formula: {
      type: "floor-multiply",
      operands: [
        {
          type: "add",
          operands: [
            {
              type: "floor",
              operand: {
                type: "multiply",
                operands: [
                  {
                    type: "add",
                    operands: [
                      { type: "metric-refs", metricIds: ["resistance-spell"] },
                      { type: "metric-refs", metricIds: ["resistance-physical"] },
                    ],
                  },
                  { type: "constant", value: 0.01125 },
                ],
              },
            },
            { type: "constant", value: 1 },
            { type: "sum", effectType: "integer" },
          ],
        },
        {
          type: "multiply",
          operands: [
            {
              type: "add",
              operands: [
                { type: "constant", value: 1 },
                {
                  type: "metric-refs",
                  metricIds: [
                    "damage-done-physical",
                    "damage-done-generic",
                    "damage-done-direct",
                    "damage-done-single-target",
                  ],
                },
              ],
            },
            {
              type: "product",
              effectType: "fractional-change",
            },
          ],
        },
      ],
    },
    fullyImplemented: true,
  },
  "block-cost-reduction": {
    id: "block-cost-reduction",

    name: "Block Cost Reduction",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_BLOCK_COST",
    esoStatValuePart: "percent",
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
    fullyImplemented: true,
  },
  "block-mitigation": {
    id: "block-mitigation",

    name: "Block Mitigation",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_BLOCK_MITIGATION",
    esoStatValuePart: "percent",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    formula: {
      type: "add",
      operands: [
        { type: "constant", value: 1 },
        {
          type: "multiply",
          operands: [
            { type: "constant", value: -0.5 },
            {
              type: "add",
              operands: [
                { type: "constant", value: 1 },
                {
                  type: "multiply",
                  operands: [
                    { type: "constant", value: -1 },
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
      ],
    },
    fullyImplemented: true,
  },
  "block-speed": {
    id: "block-speed",

    name: "Block Speed",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_BLOCK_SPEED",
    esoStatValuePart: "percent",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    formula: {
      type: "multiply",
      operands: [
        { type: "constant", value: 0.4 },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "sum", categories: ["skills"], effectType: "fractional-change" },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "sum", categories: ["champion-points"], effectType: "fractional-change" },
          ],
        },
      ],
    },
    fullyImplemented: true,
  },
  "bloodthirsty": {
    id: "bloodthirsty",

    name: "Bloodthirsty",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "bloodthirsty-spell-damage": {
    id: "bloodthirsty-spell-damage",

    name: "Bloodthirsty Spell Damage",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: false,
    formula: {
      type: "metric-refs",
      metricIds: ["bloodthirsty"],
    },
  },
  "bloodthirsty-weapon-damage": {
    id: "bloodthirsty-weapon-damage",

    name: "Bloodthirsty Weapon Damage",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: false,
    formula: {
      type: "metric-refs",
      metricIds: ["bloodthirsty"],
    },
  },
}
