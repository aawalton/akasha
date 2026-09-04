import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import type { MetricTemplate } from "../metric-template/metric-template.module.code.ts"

export const METRICS_DATA_04: Partial<Record<MetricId, MetricTemplate>> = {
  "defense-physical-dd-mitigation": {
    id: "defense-physical-dd-mitigation",

    name: "Defense Physical Direct Mitigation",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "metric-refs", metricIds: ["damage-taken-direct"] },
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
                { type: "metric-refs", metricIds: ["defense-physical-mitigation"] },
              ],
            },
          ],
        },
      ],
    },
  },
  "defense-physical-mitigation": {
    id: "defense-physical-mitigation",

    name: "Defense Physical Mitigation",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_PHYSICAL_RESIST",
    esoStatValuePart: "percent",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: false,
    formula: {
      type: "divide",
      operands: [
        {
          type: "min",
          operands: [
            { type: "constant", value: 33000 },
            { type: "metric-refs", metricIds: ["resistance-physical"] },
          ],
        },
        { type: "constant", value: 66000 },
      ],
    },
  },
  "defense-spell-aoe-mitigation": {
    id: "defense-spell-aoe-mitigation",

    name: "Defense Spell AOE Mitigation",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "metric-refs", metricIds: ["damage-taken-from-area"] },
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
                { type: "metric-refs", metricIds: ["defense-spell-mitigation"] },
              ],
            },
          ],
        },
      ],
    },
  },
  "defense-spell-dd-mitigation": {
    id: "defense-spell-dd-mitigation",

    name: "Defense Spell Direct Mitigation",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "metric-refs", metricIds: ["damage-taken-direct"] },
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
                { type: "metric-refs", metricIds: ["defense-spell-mitigation"] },
              ],
            },
          ],
        },
      ],
    },
  },
  "defense-spell-mitigation": {
    id: "defense-spell-mitigation",

    name: "Defense Spell Mitigation",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_SPELL_RESIST",
    esoStatValuePart: "percent",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: false,
    formula: {
      type: "divide",
      operands: [
        {
          type: "min",
          operands: [
            { type: "constant", value: 33000 },
            { type: "metric-refs", metricIds: ["resistance-spell"] },
          ],
        },
        { type: "constant", value: 66000 },
      ],
    },
  },
  "disease-damage": {
    id: "disease-damage",

    name: "Disease Damage",
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
                    { type: "metric-refs", metricIds: ["status-disease-spell-damage"] },
                    { type: "metric-refs", metricIds: ["status-disease-weapon-damage"] },
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
            { type: "metric-refs", metricIds: ["damage-done-disease"] },
            { type: "metric-refs", metricIds: ["damage-done-direct"] },
            { type: "metric-refs", metricIds: ["damage-done-single-target"] },
            { type: "metric-refs", metricIds: ["damage-done-base"] },
          ],
        },
      ],
    },
  },
  "divines": {
    id: "divines",

    name: "Divines",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "effective-healing": {
    id: "effective-healing",

    name: "Effective Healing Power",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "max",
      operands: [
        { type: "metric-refs", metricIds: ["effective-healing-spell"] },
        { type: "metric-refs", metricIds: ["effective-healing-weapon"] },
      ],
    },
  },
  "effective-healing-spell": {
    id: "effective-healing-spell",

    name: "Effective Spell Healing Power",
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
              type: "multiply",
              operands: [
                { type: "metric-refs", metricIds: ["magicka-maximum"] },
                { type: "constant", value: 0.095238 },
              ],
            },
            { type: "metric-refs", metricIds: ["power-spell"] },
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
                  type: "metric-refs",
                  metricIds: ["critical-rating-spell"],
                  convertRatingToChance: true,
                },
                { type: "metric-refs", metricIds: ["healing-critical-bonus-spell"] },
              ],
            },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "metric-refs", metricIds: ["target-healing-received"] },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "metric-refs", metricIds: ["healing-done-base"] },
          ],
        },
      ],
    },
  },
  "effective-healing-weapon": {
    id: "effective-healing-weapon",

    name: "Effective Weapon Healing Power",
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
              type: "multiply",
              operands: [
                { type: "metric-refs", metricIds: ["stamina-maximum"] },
                { type: "constant", value: 0.095238 },
              ],
            },
            { type: "metric-refs", metricIds: ["power-weapon"] },
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
                  type: "metric-refs",
                  metricIds: ["critical-rating-weapon"],
                  convertRatingToChance: true,
                },
                { type: "metric-refs", metricIds: ["healing-critical-bonus-weapon"] },
              ],
            },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "metric-refs", metricIds: ["target-healing-received"] },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "metric-refs", metricIds: ["healing-done-base"] },
          ],
        },
      ],
    },
  },
  "effective-health": {
    id: "effective-health",

    name: "Effective Health",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "min",
      operands: [
        { type: "metric-refs", metricIds: ["effective-health-physical"] },
        { type: "metric-refs", metricIds: ["effective-health-spell"] },
      ],
    },
  },
  "effective-health-physical": {
    id: "effective-health-physical",

    name: "Effective Health (Physical)",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "divide",
      operands: [
        { type: "metric-refs", metricIds: ["health-maximum"] },
        {
          type: "multiply",
          operands: [
            {
              type: "add",
              operands: [
                { type: "constant", value: 1 },
                {
                  type: "multiply",
                  operands: [
                    { type: "constant", value: -1 },
                    {
                      type: "min",
                      operands: [
                        { type: "constant", value: 0.5 },
                        {
                          type: "metric-refs",
                          metricIds: ["resistance-physical"],
                          convertRatingToChance: true,
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
                { type: "metric-refs", metricIds: ["damage-taken"] },
              ],
            },
          ],
        },
      ],
    },
  },
  "effective-health-spell": {
    id: "effective-health-spell",

    name: "Effective Health (Spell)",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "divide",
      operands: [
        { type: "metric-refs", metricIds: ["health-maximum"] },
        {
          type: "multiply",
          operands: [
            {
              type: "add",
              operands: [
                { type: "constant", value: 1 },
                {
                  type: "multiply",
                  operands: [
                    { type: "constant", value: -1 },
                    {
                      type: "min",
                      operands: [
                        { type: "constant", value: 0.5 },
                        {
                          type: "metric-refs",
                          metricIds: ["resistance-spell"],
                          convertRatingToChance: true,
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
                { type: "metric-refs", metricIds: ["damage-taken"] },
              ],
            },
          ],
        },
      ],
    },
  },
  "effective-power": {
    id: "effective-power",

    name: "Effective Power",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "max",
      operands: [
        { type: "metric-refs", metricIds: ["effective-power-spell"] },
        { type: "metric-refs", metricIds: ["effective-power-weapon"] },
      ],
    },
  },
}
