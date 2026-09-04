import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { BuffOrDebuffTemplate } from "../buff-or-debuff-source/buff-or-debuff-source.module.code.ts"

interface BuffMinorEffect {
  metricId: string
  effectType: string
  effectValue: number | { value: number; seconds: number }
}

interface BuffMinorTemplate {
  id: string
  name: string
  description: string
  categoryId: "buffs"
  subcategoryId: "minor"
  effects: readonly BuffMinorEffect[]
}

export const TEMPER_BUFF_MINOR_DATA = {
  "minor-aegis": {
    id: "minor-aegis" as const,
    name: "Minor Aegis",
    description: "Reduces damage taken from Dungeon, Trial, and Arena monsters by 5%",
    categoryId: "buffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "damage-taken-dungeon" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.05,
      },
      {
        metricId: "damage-taken-trial" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.05,
      },
      {
        metricId: "damage-taken-arena" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.05,
      },
    ],
  },
  "minor-berserk": {
    id: "minor-berserk" as const,
    name: "Minor Berserk",
    description: "Increases damage done by 5%",
    categoryId: "buffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "damage-done-base" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.05,
      },
    ],
  },
  "minor-brutality": {
    id: "minor-brutality" as const,
    name: "Minor Brutality",
    description: "Increases Weapon Damage by 10%",
    categoryId: "buffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "power-weapon" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.1,
      },
    ],
  },
  "minor-courage": {
    id: "minor-courage" as const,
    name: "Minor Courage",
    description: "Increases Weapon and Spell Damage by 215",
    categoryId: "buffs" as const,
    subcategoryId: "minor" as const,
    effects: [{ metricId: "power" as const, effectType: "integer" as const, effectValue: 215 }],
  },
  "minor-endurance": {
    id: "minor-endurance" as const,
    name: "Minor Endurance",
    description: "Increases Stamina Recovery by 15%",
    categoryId: "buffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "stamina-recovery" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.15,
      },
    ],
  },
  "minor-evasion": {
    id: "minor-evasion" as const,
    name: "Minor Evasion",
    description: "Reduces damage from area attacks by 10%",
    categoryId: "buffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "damage-taken-from-area" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.1,
      },
    ],
  },
  "minor-expedition": {
    id: "minor-expedition" as const,
    name: "Minor Expedition",
    description: "Increases movement speed by 15%",
    categoryId: "buffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "movement-speed" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.15,
      },
    ],
  },
  "minor-force": {
    id: "minor-force" as const,
    name: "Minor Force",
    description: "Increases Critical Damage by 10%",
    categoryId: "buffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "critical-damage" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.1,
      },
    ],
  },
  "minor-fortitude": {
    id: "minor-fortitude" as const,
    name: "Minor Fortitude",
    description: "Increases Health Recovery by 15%",
    categoryId: "buffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "health-recovery" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.15,
      },
    ],
  },
  "minor-gallop": {
    id: "minor-gallop" as const,
    name: "Minor Gallop",
    description: "Increases mounted speed by 15%",
    categoryId: "buffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "mounted-speed" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.15,
      },
    ],
  },
  "minor-heroism": {
    id: "minor-heroism" as const,
    name: "Minor Heroism",
    description: "Grants 1 Ultimate every 1.5 seconds",
    categoryId: "buffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "ultimate-recovery" as const,
        effectType: "number-per-seconds" as const,
        effectValue: { value: 1, seconds: 1.5 },
      },
    ],
  },
  "minor-intellect": {
    id: "minor-intellect" as const,
    name: "Minor Intellect",
    description: "Increases Magicka Recovery by 15%",
    categoryId: "buffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "magicka-recovery" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.15,
      },
    ],
  },
  "minor-mending": {
    id: "minor-mending" as const,
    name: "Minor Mending",
    description: "Increases healing done by 8%",
    categoryId: "buffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "healing-done-base" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.08,
      },
    ],
  },
  "minor-prophecy": {
    id: "minor-prophecy" as const,
    name: "Minor Prophecy",
    description: "Increases Spell Critical by 1314",
    categoryId: "buffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "critical-rating-spell" as const,
        effectType: "integer" as const,
        effectValue: 1314,
      },
    ],
  },
  "minor-protection": {
    id: "minor-protection" as const,
    name: "Minor Protection",
    description: "Reduces damage taken by 5%",
    categoryId: "buffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "damage-taken" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.05,
      },
    ],
  },
  "minor-resolve": {
    id: "minor-resolve" as const,
    name: "Minor Resolve",
    description: "Increases Physical and Spell Resistance by 2974",
    categoryId: "buffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      { metricId: "resistance" as const, effectType: "integer" as const, effectValue: 2974 },
    ],
  },
  "minor-savagery": {
    id: "minor-savagery" as const,
    name: "Minor Savagery",
    description: "Increases Weapon Critical by 1314",
    categoryId: "buffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "critical-rating-weapon" as const,
        effectType: "integer" as const,
        effectValue: 1314,
      },
    ],
  },
  "minor-slayer": {
    id: "minor-slayer" as const,
    name: "Minor Slayer",
    description: "Increases damage done to Dungeon, Trial, and Arena monsters by 5%",
    categoryId: "buffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "damage-done-dungeon" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.05,
      },
      {
        metricId: "damage-done-trial" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.05,
      },
      {
        metricId: "damage-done-arena" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.05,
      },
    ],
  },
  "minor-sorcery": {
    id: "minor-sorcery" as const,
    name: "Minor Sorcery",
    description: "Increases Spell Damage by 10%",
    categoryId: "buffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "power-spell" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.1,
      },
    ],
  },
  "minor-toughness": {
    id: "minor-toughness" as const,
    name: "Minor Toughness",
    description: "Increases Max Health by 10%",
    categoryId: "buffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "health-maximum" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.1,
      },
    ],
  },
  "minor-vitality": {
    id: "minor-vitality" as const,
    name: "Minor Vitality",
    description: "Increases healing received and damage shield strength by 6%",
    categoryId: "buffs" as const,
    subcategoryId: "minor" as const,
    effects: [
      {
        metricId: "healing-received-base" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.06,
      },
    ],
  },
} satisfies Record<string, BuffMinorTemplate>

export const buffsMinor = createDataFile<BuffOrDebuffTemplate>()(TEMPER_BUFF_MINOR_DATA)
