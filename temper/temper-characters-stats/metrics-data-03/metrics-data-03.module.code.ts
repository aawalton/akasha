import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import type { MetricTemplate } from "../metric-template/metric-template.module.code.ts"

export const METRICS_DATA_03: Partial<Record<MetricId, MetricTemplate>> = {
  "damage-done-dot": {
    id: "damage-done-dot",

    name: "Damage Done (DOT)",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-done-dungeon": {
    id: "damage-done-dungeon",

    name: "Damage Done (Dungeon)",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-done-earth": {
    id: "damage-done-earth",

    name: "Damage Done (Earth)",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_EARTH_DAMAGE",
    esoStatValuePart: "percent",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-done-flame": {
    id: "damage-done-flame",

    name: "Damage Done (Flame)",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_FIRE_DAMAGE",
    esoStatValuePart: "percent",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-done-frost": {
    id: "damage-done-frost",

    name: "Damage Done (Frost)",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_COLD_DAMAGE",
    esoStatValuePart: "percent",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-done-generic": {
    id: "damage-done-generic",

    name: "Damage Done (Generic)",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_GENERIC_DAMAGE",
    esoStatValuePart: "percent",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-done-heavy-attack": {
    id: "damage-done-heavy-attack",

    name: "Damage Done (Heavy Attack)",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-done-magic": {
    id: "damage-done-magic",

    name: "Damage Done (Magic)",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_MAGIC_DAMAGE",
    esoStatValuePart: "percent",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-done-oblivion": {
    id: "damage-done-oblivion",

    name: "Damage Done (Oblivion)",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_OBLIVION_DAMAGE",
    esoStatValuePart: "percent",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-done-pet": {
    id: "damage-done-pet",

    name: "Damage Done (Pet)",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-done-physical": {
    id: "damage-done-physical",

    name: "Damage Done (Physical)",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_PHYSICAL_DAMAGE",
    esoStatValuePart: "percent",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-done-players": {
    id: "damage-done-players",

    name: "Damage Done (Players)",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-done-poison": {
    id: "damage-done-poison",

    name: "Damage Done (Poison)",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_POISON_DAMAGE",
    esoStatValuePart: "percent",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-done-shock": {
    id: "damage-done-shock",

    name: "Damage Done (Shock)",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_SHOCK_DAMAGE",
    esoStatValuePart: "percent",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-done-single-target": {
    id: "damage-done-single-target",

    name: "Damage Done (Single Target)",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-done-status-effect": {
    id: "damage-done-status-effect",

    name: "Damage Done (Status Effect)",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-done-trial": {
    id: "damage-done-trial",

    name: "Damage Done (Trial)",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-shield-cost": {
    id: "damage-shield-cost",

    name: "Damage Shield Cost",
    valueType: "fractional-change",
    polarity: "lower-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-shield": {
    id: "damage-shield",

    name: "Damage Shield",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
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
                { type: "sum", categories: ["buffs"], effectType: "fractional-change" },
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
                { type: "sum", categories: ["skills"], effectType: "fractional-change" },
              ],
            },
          ],
        },
        { type: "constant", value: -1 },
      ],
    },
  },
  "damage-taken-arena": {
    id: "damage-taken-arena",

    name: "Damage Taken (Arena)",
    valueType: "fractional-change",
    polarity: "lower-is-better",
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
  "damage-taken-direct": {
    id: "damage-taken-direct",

    name: "Direct Damage Taken",
    valueType: "fractional-change",
    polarity: "lower-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-taken-dot": {
    id: "damage-taken-dot",

    name: "Damage Taken (DOT)",
    valueType: "fractional-change",
    polarity: "lower-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-taken-dungeon": {
    id: "damage-taken-dungeon",

    name: "Damage Taken (Dungeon)",
    valueType: "fractional-change",
    polarity: "lower-is-better",
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
  "damage-taken-fall": {
    id: "damage-taken-fall",

    name: "Damage Taken (Fall)",
    valueType: "fractional-change",
    polarity: "lower-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-taken-from-area": {
    id: "damage-taken-from-area",

    name: "Damage Taken from Area",
    valueType: "fractional-change",
    polarity: "lower-is-better",
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
  "damage-taken-ha": {
    id: "damage-taken-ha",

    name: "Damage Taken (Heavy Attack)",
    valueType: "fractional-change",
    polarity: "lower-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-taken-la": {
    id: "damage-taken-la",

    name: "Damage Taken (Light Attack)",
    valueType: "fractional-change",
    polarity: "lower-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "damage-taken": {
    id: "damage-taken",

    name: "Damage Taken",
    valueType: "fractional-change",
    polarity: "lower-is-better",
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
  "damage-taken-trial": {
    id: "damage-taken-trial",

    name: "Damage Taken (Trial)",
    valueType: "fractional-change",
    polarity: "lower-is-better",
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
  "defense-crit-dmg": {
    id: "defense-crit-dmg",

    name: "Defense Crit Damage",
    valueType: "fractional-change",
    polarity: "lower-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        { type: "metric-refs", metricIds: ["resistance-critical"] },
        { type: "constant", value: -0.00014 },
      ],
    },
  },
  "defense-physical-aoe-mitigation": {
    id: "defense-physical-aoe-mitigation",

    name: "Defense Physical AOE Mitigation",
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
                { type: "metric-refs", metricIds: ["defense-physical-mitigation"] },
              ],
            },
          ],
        },
      ],
    },
  },
}
