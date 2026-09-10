import type { CompanionMetricTemplate } from "../companion-metric-template/companion-metric-template.module.code.ts"

export const COMPANION_METRICS_02 = {
  "companion-sps-self": {
    id: "companion-sps-self",
    name: "Self Shielding Per Second",
    valueType: "integer",
  },
  "companion-sps-total": {
    id: "companion-sps-total",
    name: "Shielding Per Second",
    valueType: "integer",
    formula: {
      type: "add",
      operands: [
        { type: "metric-ref", metricId: "companion-sps-self" },
        { type: "metric-ref", metricId: "companion-sps-ally" },
      ],
    },
  },
  "companion-support-dps": {
    id: "companion-support-dps",
    name: "Support DPS",
    valueType: "integer",
  },
  "companion-support-score": {
    id: "companion-support-score",
    name: "Support Score",
    valueType: "integer",
    formula: {
      type: "add",
      operands: [
        { type: "metric-ref", metricId: "companion-support-dps" },
        { type: "metric-ref", metricId: "companion-support-tps" },
      ],
    },
  },
  "companion-support-tps": {
    id: "companion-support-tps",
    name: "Support TPS",
    valueType: "integer",
  },
  "companion-target-armor": {
    id: "companion-target-armor",
    name: "Target Armor",
    valueType: "rating",
    effectType: "integer",
    divisor: 50000,
    cap: 0.5,
  },
  "companion-target-remaining-armor": {
    id: "companion-target-remaining-armor",
    name: "Target Remaining Armor",
    valueType: "rating",
    divisor: 50000,
    cap: 0.5,
    formula: {
      type: "add",
      operands: [
        { type: "metric-ref", metricId: "companion-target-armor" },
        {
          type: "multiply",
          operands: [
            { type: "metric-ref", metricId: "companion-penetration" },
            { type: "constant", value: -1 },
          ],
        },
      ],
    },
  },
  "companion-tooltip-weapon-damage": {
    id: "companion-tooltip-weapon-damage",
    name: "Tooltip Weapon Damage",
    valueType: "integer",
    formula: {
      type: "multiply",
      operands: [
        { type: "metric-ref", metricId: "companion-weapon-damage" },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "metric-ref", metricId: "companion-damage-done" },
          ],
        },
      ],
    },
  },
  "companion-tooltip-weapon-healing": {
    id: "companion-tooltip-weapon-healing",
    name: "Tooltip Weapon Healing",
    valueType: "integer",
    formula: {
      type: "multiply",
      operands: [
        { type: "metric-ref", metricId: "companion-weapon-damage" },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "metric-ref", metricId: "companion-healing-done" },
          ],
        },
      ],
    },
  },
  "companion-tps-buff": {
    id: "companion-tps-buff",
    name: "Buff Toughness",
    valueType: "integer",
  },
  "companion-tps-self-hps": {
    id: "companion-tps-self-hps",
    name: "Self Healing Per Second",
    valueType: "integer",
  },
  "companion-tps-shield": {
    id: "companion-tps-shield",
    name: "Shields Per Second",
    valueType: "integer",
  },
  "companion-tps-total": {
    id: "companion-tps-total",
    name: "Toughness Per Second",
    valueType: "integer",
    formula: {
      type: "add",
      operands: [
        { type: "metric-ref", metricId: "companion-effective-toughness" },
        { type: "metric-ref", metricId: "companion-tps-buff" },
        { type: "metric-ref", metricId: "companion-tps-self-hps" },
        { type: "metric-ref", metricId: "companion-tps-shield" },
      ],
    },
  },
  "companion-ultimate-generation": {
    id: "companion-ultimate-generation",
    name: "Ultimate Generation",
    valueType: "fractional-change",
    effectType: "fractional-change",
  },
  "companion-weapon-damage": {
    id: "companion-weapon-damage",
    name: "Weapon Damage",
    valueType: "integer",
    effectType: "integer",
  },
} satisfies Record<string, CompanionMetricTemplate>
