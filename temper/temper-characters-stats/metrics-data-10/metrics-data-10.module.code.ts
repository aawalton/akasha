import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import type { MetricTemplate } from "../metric-template/metric-template.module.code.ts"

export const METRICS_DATA_10: Partial<Record<MetricId, MetricTemplate>> = {
  "la-shock-staff": {
    id: "la-shock-staff",

    name: "LA Shock Staff",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        {
          type: "min",
          operands: [
            {
              type: "add",
              operands: [
                {
                  type: "floor-multiply",
                  operands: [
                    { type: "constant", value: 0.045 },
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
                    { type: "constant", value: 0.4725 },
                    {
                      type: "max",
                      operands: [
                        { type: "metric-refs", metricIds: ["la-shock-spell-damage"] },
                        { type: "metric-refs", metricIds: ["la-shock-weapon-damage"] },
                      ],
                    },
                  ],
                },
              ],
            },
            { type: "constant", value: 3465 },
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
            { type: "metric-refs", metricIds: ["damage-done-shock"] },
            { type: "metric-refs", metricIds: ["damage-done-single-target"] },
            { type: "metric-refs", metricIds: ["damage-done-dot"] },
            { type: "metric-refs", metricIds: ["damage-done-base"] },
          ],
        },
      ],
    },
  },
  "la-shock-weapon-damage": {
    id: "la-shock-weapon-damage",

    name: "LA Shock Weapon Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-weapon"],
    },
  },
  "la-speed": {
    id: "la-speed",

    name: "LA Speed",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "add",
      operands: [
        { type: "constant", value: 1 },
        { type: "sum", effectType: "fractional-change" },
      ],
    },
  },
  "la-two-hand": {
    id: "la-two-hand",

    name: "LA Two Hand",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        {
          type: "min",
          operands: [
            {
              type: "add",
              operands: [
                {
                  type: "floor-multiply",
                  operands: [
                    { type: "constant", value: 0.05 },
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
                    { type: "constant", value: 0.55 },
                    {
                      type: "max",
                      operands: [
                        { type: "metric-refs", metricIds: ["la-physical-weapon-damage"] },
                        { type: "metric-refs", metricIds: ["la-physical-spell-damage"] },
                      ],
                    },
                  ],
                },
              ],
            },
            { type: "constant", value: 3850 },
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
            { type: "metric-refs", metricIds: ["damage-done-physical"] },
            { type: "metric-refs", metricIds: ["damage-done-direct"] },
            { type: "metric-refs", metricIds: ["damage-done-single-target"] },
            { type: "metric-refs", metricIds: ["damage-done-base"] },
          ],
        },
      ],
    },
  },
  "la-unarmed": {
    id: "la-unarmed",

    name: "LA Unarmed",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        {
          type: "min",
          operands: [
            {
              type: "add",
              operands: [
                {
                  type: "floor-multiply",
                  operands: [
                    { type: "constant", value: 0.05 },
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
                    { type: "constant", value: 0.55 },
                    {
                      type: "max",
                      operands: [
                        { type: "metric-refs", metricIds: ["la-physical-weapon-damage"] },
                        { type: "metric-refs", metricIds: ["la-physical-spell-damage"] },
                      ],
                    },
                  ],
                },
              ],
            },
            { type: "constant", value: 3850 },
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
            { type: "metric-refs", metricIds: ["damage-done-physical"] },
            { type: "metric-refs", metricIds: ["damage-done-direct"] },
            { type: "metric-refs", metricIds: ["damage-done-single-target"] },
            { type: "metric-refs", metricIds: ["damage-done-base"] },
          ],
        },
      ],
    },
  },
  "la-werewolf": {
    id: "la-werewolf",

    name: "LA Werewolf",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        {
          type: "min",
          operands: [
            {
              type: "add",
              operands: [
                {
                  type: "floor-multiply",
                  operands: [
                    { type: "constant", value: 0.05 },
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
                    { type: "constant", value: 0.55 },
                    {
                      type: "max",
                      operands: [
                        { type: "metric-refs", metricIds: ["la-physical-weapon-damage"] },
                        { type: "metric-refs", metricIds: ["la-physical-spell-damage"] },
                      ],
                    },
                  ],
                },
              ],
            },
            { type: "constant", value: 3850 },
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
            { type: "metric-refs", metricIds: ["damage-done-physical"] },
            { type: "metric-refs", metricIds: ["damage-done-direct"] },
            { type: "metric-refs", metricIds: ["damage-done-single-target"] },
            { type: "metric-refs", metricIds: ["damage-done-base"] },
          ],
        },
      ],
    },
  },
  "magical-ability-status-chance": {
    id: "magical-ability-status-chance",

    name: "Magical Status Chance (Ability)",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        { type: "constant", value: 0.1 },
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
  "magical-aoe-status-chance": {
    id: "magical-aoe-status-chance",

    name: "Magical Status Chance (AOE)",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        { type: "constant", value: 0.05 },
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
  "magical-aoedot-status-chance": {
    id: "magical-aoedot-status-chance",

    name: "Magical Status Chance (AOE+DOT)",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        { type: "constant", value: 0.01 },
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
  "magical-dot-status-chance": {
    id: "magical-dot-status-chance",

    name: "Magical Status Chance (DOT)",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        { type: "constant", value: 0.03 },
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
  "magical-enchant-status-chance": {
    id: "magical-enchant-status-chance",

    name: "Magical Status Chance (Enchants)",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        { type: "constant", value: 0.2 },
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
  "magicka-ability-cost": {
    id: "magicka-ability-cost",
    fullyImplemented: true,

    name: "Magicka Ability Cost",
    valueType: "fractional-change",
    polarity: "lower-is-better",
    formula: {
      type: "add",
      operands: [
        {
          type: "multiply",
          operands: [
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
            {
              type: "add",
              operands: [
                { type: "constant", value: 1 },
                { type: "sum", categories: ["buffs"], effectType: "fractional-change" },
              ],
            },
            {
              type: "add",
              operands: [
                { type: "constant", value: 1 },
                { type: "sum", categories: ["curse"], effectType: "fractional-change" },
              ],
            },
          ],
        },
        { type: "constant", value: -1 },
      ],
    },
  },
}
