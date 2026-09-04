import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import type { MetricTemplate } from "../metric-template/metric-template.module.code.ts"

export const METRICS_DATA_11: Partial<Record<MetricId, MetricTemplate>> = {
  "magicka-maximum": {
    id: "magicka-maximum",
    fullyImplemented: true,

    name: "Max Magicka",
    category: "base",
    esoStatConstantName: "STAT_MAGICKA_MAX",
    valueType: "integer",
    polarity: "higher-is-better",
    formula: {
      type: "multiply",
      operands: [
        { type: "sum", effectType: "integer" },
        { type: "product", effectType: "fractional-change" },
      ],
    },
  },
  "magicka-recovery-idle": {
    id: "magicka-recovery-idle",

    name: "Magicka Recovery (Idle)",
    category: "base",
    esoStatConstantName: "STAT_MAGICKA_REGEN_IDLE",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        { type: "sum-for-metric", metricId: "magicka-recovery", effectType: "integer" },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            {
              type: "sum-for-metric",
              metricId: "magicka-recovery",
              effectType: "fractional-change",
            },
          ],
        },
        { type: "constant", value: 2 },
      ],
    },
  },
  "magicka-recovery": {
    id: "magicka-recovery",
    fullyImplemented: true,

    name: "Magicka Recovery",
    category: "base",
    esoStatConstantName: "STAT_MAGICKA_REGEN_COMBAT",
    valueType: "integer",
    polarity: "higher-is-better",
    formula: {
      type: "multiply",
      operands: [
        {
          type: "floor",
          operand: { type: "sum", effectType: "integer" },
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
  },
  "magicka-restore": {
    id: "magicka-restore",
    fullyImplemented: true,

    name: "Restore Magicka",
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
  "martial-ability-status-chance": {
    id: "martial-ability-status-chance",

    name: "Martial Status Chance (Ability)",
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
  "martial-aoe-status-chance": {
    id: "martial-aoe-status-chance",

    name: "Martial Status Chance (AOE)",
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
  "martial-aoedot-status-chance": {
    id: "martial-aoedot-status-chance",

    name: "Martial Status Chance (AOE+DOT)",
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
  "martial-dot-status-chance": {
    id: "martial-dot-status-chance",

    name: "Martial Status Chance (DOT)",
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
  "martial-enchant-status-chance": {
    id: "martial-enchant-status-chance",

    name: "Martial Status Chance (Enchants)",
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
  "mount-stamina-maximum": {
    id: "mount-stamina-maximum",

    name: "Mount Stamina Maximum",
    category: "base",
    esoStatConstantName: "STAT_MOUNT_STAMINA_MAX",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: false,
  },
  "mount-stamina-regen-combat": {
    id: "mount-stamina-regen-combat",

    name: "Mount Stamina Regen (Combat)",
    category: "base",
    esoStatConstantName: "STAT_MOUNT_STAMINA_REGEN_COMBAT",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "integer",
    },
  },
  "mount-stamina-regen-moving": {
    id: "mount-stamina-regen-moving",

    name: "Mount Stamina Regen (Moving)",
    category: "base",
    esoStatConstantName: "STAT_MOUNT_STAMINA_REGEN_MOVING",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "integer",
    },
  },
  "mounted-run-speed": {
    id: "mounted-run-speed",

    name: "Mounted Run Speed",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        {
          type: "sum",
          effectType: "fractional-change",
        },
        {
          type: "product",
          effectType: "fractional-change",
        },
      ],
    },
  },
  "mounted-speed": {
    id: "mounted-speed",

    name: "Mounted Speed",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        {
          type: "sum",
          effectType: "fractional-change",
        },
        {
          type: "product",
          effectType: "fractional-change",
        },
      ],
    },
  },
  "mounted-walk-speed": {
    id: "mounted-walk-speed",

    name: "Mounted Walk Speed",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        {
          type: "sum",
          effectType: "fractional-change",
        },
        {
          type: "product",
          effectType: "fractional-change",
        },
      ],
    },
  },
  "movement-run-speed": {
    id: "movement-run-speed",

    name: "Run Speed",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        {
          type: "sum",
          effectType: "fractional-change",
        },
        {
          type: "product",
          effectType: "fractional-change",
        },
      ],
    },
  },
  "movement-sneak-penalty": {
    id: "movement-sneak-penalty",

    name: "Sneak Penalty",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        {
          type: "sum",
          effectType: "fractional-change",
          categories: ["base"],
        },
        {
          type: "max",
          operands: [
            { type: "constant", value: 0 },
            {
              type: "product",
              effectType: "fractional-change",
              categories: ["champion-points", "skills", "sets", "buffs"],
            },
          ],
        },
      ],
    },
  },
  "movement-sneak-speed": {
    id: "movement-sneak-speed",

    name: "Sneak Speed",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_SNEAK_SPEED_REDUCTION",
    esoStatValuePart: "percent",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        { type: "constant", value: 1 },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "metric-refs", metricIds: ["movement-sneak-penalty"] },
            {
              type: "sum",
              categories: ["buffs", "mundus", "skills", "sets"],
              effectType: "fractional-change",
            },
          ],
        },
        {
          type: "product",
          effectType: "fractional-change",
        },
      ],
    },
  },
  "movement-speed": {
    id: "movement-speed",

    name: "Movement Speed",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        {
          type: "sum",
          effectType: "fractional-change",
        },
        {
          type: "product",
          effectType: "fractional-change",
        },
      ],
    },
  },
  "movement-sprint-speed": {
    id: "movement-sprint-speed",

    name: "Sprint Speed",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_SPRINT_SPEED",
    esoStatValuePart: "percent",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "min",
      operands: [
        { type: "constant", value: 2 },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "constant", value: 0.4 },
            { type: "sum", effectType: "fractional-change" },
          ],
        },
      ],
    },
  },
  "movement-swim-speed": {
    id: "movement-swim-speed",

    name: "Swim Speed",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        {
          type: "sum",
          effectType: "fractional-change",
        },
        {
          type: "product",
          effectType: "fractional-change",
        },
      ],
    },
  },
  "movement-walk-speed": {
    id: "movement-walk-speed",

    name: "Walk Speed",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        {
          type: "sum",
          effectType: "fractional-change",
        },
        {
          type: "product",
          effectType: "fractional-change",
        },
      ],
    },
  },
}
