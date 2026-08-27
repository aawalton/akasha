import { createDataFile } from "@shared/utils-narrow/create-data-file"
import type { ChampionPointTemplate } from "../champion-points-source"

const WARFARE_PASSIVE_CHAMPION_POINTS = {
  precision: {
    id: "precision" as const,
    esoChampionSkillId: 11,
    name: "Precision",
    description: "Grants 320 Critical Chance (max 20 points)",
    categoryId: "champion-points" as const,
    subcategoryId: "warfare-passives" as const,
    isSlottable: false,
    effects: [
      {
        metricId: "critical-rating" as const,
        effectType: "integer" as const,
        effectValue: 320,
      },
    ],
  },
  blessed: {
    id: "blessed" as const,
    esoChampionSkillId: 108,
    name: "Blessed",
    description: "Increases Healing Done by 2% (max 20 points)",
    categoryId: "champion-points" as const,
    subcategoryId: "warfare-passives" as const,
    isSlottable: false,
    effects: [
      {
        metricId: "healing-done-base" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.02,
      },
    ],
  },
  piercing: {
    id: "piercing" as const,
    esoChampionSkillId: 10,
    name: "Piercing",
    description: "Grants 700 Offensive Penetration (max 20 points)",
    categoryId: "champion-points" as const,
    subcategoryId: "warfare-passives" as const,
    isSlottable: false,
    effects: [
      {
        metricId: "penetration" as const,
        effectType: "integer" as const,
        effectValue: 700,
      },
    ],
  },
  "flawless-ritual": {
    id: "flawless-ritual" as const,
    esoChampionSkillId: 17,
    name: "Flawless Ritual",
    description: "Increases your chance to apply a Magical status effect by 60%",
    categoryId: "champion-points" as const,
    subcategoryId: "warfare-passives" as const,
    isSlottable: false,
    effects: [],
  },
  "war-mage": {
    id: "war-mage" as const,
    esoChampionSkillId: 21,
    name: "War Mage",
    description:
      "Grants 100 Weapon and Spell Damage to Magical attacks. Affects Magic, Flame, Frost, and Shock Damage",
    categoryId: "champion-points" as const,
    subcategoryId: "warfare-passives" as const,
    isSlottable: false,
    effects: [],
  },
  "battle-mastery": {
    id: "battle-mastery" as const,
    esoChampionSkillId: 18,
    name: "Battle Mastery",
    description: "Increases your chance to apply a Martial status effect by 60%",
    categoryId: "champion-points" as const,
    subcategoryId: "warfare-passives" as const,
    isSlottable: false,
    effects: [],
  },
  mighty: {
    id: "mighty" as const,
    esoChampionSkillId: 22,
    name: "Mighty",
    description:
      "Grants 100 Weapon and Spell Damage to Martial attacks. Affects Physical, Poison, Disease, and Bleed Damage",
    categoryId: "champion-points" as const,
    subcategoryId: "warfare-passives" as const,
    isSlottable: false,
    effects: [],
  },
  "tireless-discipline": {
    id: "tireless-discipline" as const,
    esoChampionSkillId: 6,
    name: "Tireless Discipline",
    description: "Grants 520 Max Stamina (max 20 points)",
    categoryId: "champion-points" as const,
    subcategoryId: "warfare-passives" as const,
    isSlottable: false,
    effects: [
      {
        metricId: "stamina-maximum" as const,
        effectType: "integer" as const,
        effectValue: 520,
      },
    ],
  },
  "quick-recovery": {
    id: "quick-recovery" as const,
    esoChampionSkillId: 20,
    name: "Quick Recovery",
    description: "Increases your healing received by 2%",
    categoryId: "champion-points" as const,
    subcategoryId: "warfare-passives" as const,
    isSlottable: false,
    effects: [
      {
        metricId: "healing-taken-base" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.02,
      },
    ],
  },
  preparation: {
    id: "preparation" as const,
    esoChampionSkillId: 14,
    name: "Preparation",
    description: "Reduces your damage taken from non-player attacks by 10%",
    categoryId: "champion-points" as const,
    subcategoryId: "warfare-passives" as const,
    isSlottable: false,
    effects: [
      {
        metricId: "damage-taken" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.1,
      },
    ],
  },
  "elemental-aegis": {
    id: "elemental-aegis" as const,
    esoChampionSkillId: 15,
    name: "Elemental Aegis",
    description:
      "Reduces the damage you take from Magical attacks by 2%. Affects Magic, Flame, Frost, and Shock Damage",
    categoryId: "champion-points" as const,
    subcategoryId: "warfare-passives" as const,
    isSlottable: false,
    effects: [
      {
        metricId: "damage-taken" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.02,
      },
    ],
  },
  hardy: {
    id: "hardy" as const,
    esoChampionSkillId: 16,
    name: "Hardy",
    description:
      "Reduces the damage you take from Martial attacks by 2%. Affects Physical, Poison, Disease, and Bleed Damage",
    categoryId: "champion-points" as const,
    subcategoryId: "warfare-passives" as const,
    isSlottable: false,
    effects: [
      {
        metricId: "damage-taken" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.02,
      },
    ],
  },
  "eldritch-insight": {
    id: "eldritch-insight" as const,
    esoChampionSkillId: 99,
    name: "Eldritch Insight",
    description: "Grants 520 Max Magicka (max 20 points)",
    categoryId: "champion-points" as const,
    subcategoryId: "warfare-passives" as const,
    isSlottable: false,
    effects: [
      {
        metricId: "magicka-maximum" as const,
        effectType: "integer" as const,
        effectValue: 520,
      },
    ],
  },
  "untamed-aggression": {
    id: "untamed-aggression" as const,
    esoChampionSkillId: 4,
    name: "Untamed Aggression",
    description: "Increases your Weapon and Spell Damage by 150",
    categoryId: "champion-points" as const,
    subcategoryId: "warfare-passives" as const,
    isSlottable: false,
    effects: [],
  },
  "arcane-supremacy": {
    id: "arcane-supremacy" as const,
    esoChampionSkillId: 3,
    name: "Arcane Supremacy",
    description: "Increases Max Magicka by 1300",
    categoryId: "champion-points" as const,
    subcategoryId: "warfare-passives" as const,
    isSlottable: false,
    effects: [],
  },
} satisfies Record<string, ChampionPointTemplate>

export const warfarePassives = createDataFile<ChampionPointTemplate>()(
  WARFARE_PASSIVE_CHAMPION_POINTS
)
