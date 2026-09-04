import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { BuffOrDebuffTemplate } from "../buff-or-debuff-source/buff-or-debuff-source.module.code.ts"

interface DebuffMinorEffect {
  metricId: string
  effectType: string
  effectValue: number | { value: number; seconds: number }
}

interface DebuffMinorTemplate {
  id: string
  name: string
  description: string
  categoryId: "debuffs"
  subcategoryId: "minor"
  effects: readonly DebuffMinorEffect[]
}

export const TEMPER_DEBUFF_MINOR_DATA = {
  "minor-breach": {
    id: "minor-breach" as const,
    name: "Minor Breach",
    description: "Reduces Physical and Spell Resistance by 2974",
    categoryId: "debuffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "target-physical-resistance" as const,
        effectType: "integer" as const,
        effectValue: -2974,
      },
      {
        metricId: "target-spell-resistance" as const,
        effectType: "integer" as const,
        effectValue: -2974,
      },
    ],
  },
  "minor-brittle": {
    id: "minor-brittle" as const,
    name: "Minor Brittle",
    description: "Increases Critical Damage taken by 10%",
    categoryId: "debuffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "target-critical-damage" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.1,
      },
    ],
  },
  "minor-cowardice": {
    id: "minor-cowardice" as const,
    name: "Minor Cowardice",
    description: "Reduces Weapon and Spell Damage by 215",
    categoryId: "debuffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "target-weapon-power" as const,
        effectType: "integer" as const,
        effectValue: -215,
      },
      {
        metricId: "target-spell-power" as const,
        effectType: "integer" as const,
        effectValue: -215,
      },
    ],
  },
  "minor-defile": {
    id: "minor-defile" as const,
    name: "Minor Defile",
    description: "Reduces healing received and damage shield strength by 6%",
    categoryId: "debuffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "target-healing-received" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.06,
      },
      {
        metricId: "target-health-recovery" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.06,
      },
    ],
  },
  "minor-enervation": {
    id: "minor-enervation" as const,
    name: "Minor Enervation",
    description: "Reduces Critical Damage done by 10%",
    categoryId: "debuffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "target-critical-damage-done" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.1,
      },
    ],
  },
  "minor-lifesteal": {
    id: "minor-lifesteal" as const,
    name: "Minor Lifesteal",
    description: "Heals attackers for 600 Health when dealing damage",
    categoryId: "debuffs" as const,
    subcategoryId: "minor" as const,
    effects: [],
  },
  "minor-magickasteal": {
    id: "minor-magickasteal" as const,
    name: "Minor Magickasteal",
    description: "Restores attackers 168 Magicka when dealing damage",
    categoryId: "debuffs" as const,
    subcategoryId: "minor" as const,
    effects: [],
  },
  "minor-maim": {
    id: "minor-maim" as const,
    name: "Minor Maim",
    description: "Reduces damage done by 5%",
    categoryId: "debuffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "target-damage-done" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.05,
      },
    ],
  },
  "minor-timidity": {
    id: "minor-timidity" as const,
    name: "Minor Timidity",
    description: "Consumes 1 Ultimate every 1.5 seconds",
    categoryId: "debuffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "target-ultimate-restoration" as const,
        effectType: "number-per-seconds" as const,
        effectValue: { value: -1, seconds: 1.5 },
      },
    ],
  },
  "minor-uncertainty": {
    id: "minor-uncertainty" as const,
    name: "Minor Uncertainty",
    description: "Reduces Critical Rating by 1314",
    categoryId: "debuffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "target-critical-rating" as const,
        effectType: "integer" as const,
        effectValue: -1314,
      },
    ],
  },
  "minor-vulnerability": {
    id: "minor-vulnerability" as const,
    name: "Minor Vulnerability",
    description: "Increases damage taken by 5%",
    categoryId: "debuffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "target-damage-taken" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.05,
      },
    ],
  },
} satisfies Record<string, DebuffMinorTemplate>

export const debuffsMinor = createDataFile<BuffOrDebuffTemplate>()(TEMPER_DEBUFF_MINOR_DATA)
