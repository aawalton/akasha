import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import type { MetricTemplate } from "../metric-template/metric-template.module.code.ts"

export const METRICS_DATA_16: Partial<Record<MetricId, MetricTemplate>> = {
  "ultimate-ability-cost": {
    id: "ultimate-ability-cost",
    fullyImplemented: true,

    name: "Ultimate Ability Cost",
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
          ],
        },
        { type: "constant", value: -1 },
      ],
    },
  },
  "ultimate-generation": {
    id: "ultimate-generation",
    fullyImplemented: true,

    name: "Ultimate Generation",
    valueType: "integer",
    polarity: "higher-is-better",
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "conditional-chance",
        },
      ],
    },
  },
  "ultimate-recovery": {
    id: "ultimate-recovery",
    fullyImplemented: true,

    name: "Ultimate Recovery",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_ULTIMATE_REGEN_COMBAT",
    esoStatValuePart: "flat",
    valueType: "integer",
    polarity: "higher-is-better",
    formula: {
      type: "add",
      operands: [
        { type: "constant", value: 3 },
        {
          type: "sum",
          effectType: "number-per-seconds",
        },
      ],
    },
  },
  "ultimate-restore": {
    id: "ultimate-restore",
    fullyImplemented: true,

    name: "Ultimate Restore",
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
  },
}
