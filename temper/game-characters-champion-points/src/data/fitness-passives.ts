import { createDataFile } from "@shared/utils-narrow/create-data-file"
import type { ChampionPointTemplate } from "../champion-points-source"

const FITNESS_PASSIVE_CHAMPION_POINTS = {
  sprinter: {
    id: "sprinter" as const,
    esoChampionSkillId: 38,
    name: "Sprinter",
    description: "Reduces the cost of Sprint by 40 Stamina",
    categoryId: "champion-points" as const,
    subcategoryId: "fitness-passives" as const,
    isSlottable: false,
    effects: [
      {
        metricId: "stamina-sprint-cost" as const,
        effectType: "integer" as const,
        effectValue: -40,
      },
    ],
  },
  hasty: {
    id: "hasty" as const,
    esoChampionSkillId: 42,
    name: "Hasty",
    description: "Increases your movement speed when Sprinting by 4%",
    categoryId: "champion-points" as const,
    subcategoryId: "fitness-passives" as const,
    isSlottable: false,
    effects: [
      {
        metricId: "movement-sprint-speed" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.04,
      },
    ],
  },
  "heros-vigor": {
    id: "heros-vigor" as const,
    esoChampionSkillId: 113,
    name: "Hero's Vigor",
    description: "Grants 560 Max Health (max 20 points)",
    categoryId: "champion-points" as const,
    subcategoryId: "fitness-passives" as const,
    isSlottable: false,
    effects: [
      {
        metricId: "health-maximum" as const,
        effectType: "integer" as const,
        effectValue: 560,
      },
    ],
  },
  "tempered-soul": {
    id: "tempered-soul" as const,
    esoChampionSkillId: 58,
    name: "Tempered Soul",
    description: "Return to life after resurrection with 10% more resources",
    categoryId: "champion-points" as const,
    subcategoryId: "fitness-passives" as const,
    isSlottable: false,
    effects: [],
  },
  "piercing-gaze": {
    id: "piercing-gaze" as const,
    esoChampionSkillId: 45,
    name: "Piercing Gaze",
    description: "Increases your Stealth Detection by 3 meters",
    categoryId: "champion-points" as const,
    subcategoryId: "fitness-passives" as const,
    isSlottable: false,
    effects: [
      {
        metricId: "stealth-detection" as const,
        effectType: "integer" as const,
        effectValue: 3,
      },
    ],
  },
  "mystic-tenacity": {
    id: "mystic-tenacity" as const,
    esoChampionSkillId: 53,
    name: "Mystic Tenacity",
    description: "Reduces the duration of Elemental Status Effects applied to you by 25%",
    categoryId: "champion-points" as const,
    subcategoryId: "fitness-passives" as const,
    isSlottable: false,
    effects: [],
  },
  "tireless-guardian": {
    id: "tireless-guardian" as const,
    esoChampionSkillId: 39,
    name: "Tireless Guardian",
    description: "Reduces the cost of Block by 40 Stamina",
    categoryId: "champion-points" as const,
    subcategoryId: "fitness-passives" as const,
    isSlottable: false,
    effects: [
      {
        metricId: "stamina-block-cost" as const,
        effectType: "integer" as const,
        effectValue: -40,
      },
    ],
  },
  "savage-defense": {
    id: "savage-defense" as const,
    esoChampionSkillId: 40,
    name: "Savage Defense",
    description: "Reduces the cost of Bash by 90 Stamina",
    categoryId: "champion-points" as const,
    subcategoryId: "fitness-passives" as const,
    isSlottable: false,
    effects: [
      {
        metricId: "bash-cost" as const,
        effectType: "integer" as const,
        effectValue: -90,
      },
    ],
  },
  "bashing-brutality": {
    id: "bashing-brutality" as const,
    esoChampionSkillId: 50,
    name: "Bashing Brutality",
    description: "Increases your Bash damage by 120",
    categoryId: "champion-points" as const,
    subcategoryId: "fitness-passives" as const,
    isSlottable: false,
    effects: [
      {
        metricId: "bash-damage" as const,
        effectType: "integer" as const,
        effectValue: 120,
      },
    ],
  },
  "nimble-protector": {
    id: "nimble-protector" as const,
    esoChampionSkillId: 44,
    name: "Nimble Protector",
    description: "Increases your Movement Speed while Bracing by 6%",
    categoryId: "champion-points" as const,
    subcategoryId: "fitness-passives" as const,
    isSlottable: false,
    effects: [
      {
        metricId: "block-speed" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.06,
      },
    ],
  },
  fortification: {
    id: "fortification" as const,
    esoChampionSkillId: 43,
    name: "Fortification",
    description: "Increases the amount of damage you can block by 4%",
    categoryId: "champion-points" as const,
    subcategoryId: "fitness-passives" as const,
    isSlottable: false,
    effects: [
      {
        metricId: "block-mitigation" as const,
        effectType: "fractional-change" as const,
        effectValue: 0.04,
      },
    ],
  },
  tumbling: {
    id: "tumbling" as const,
    esoChampionSkillId: 37,
    name: "Tumbling",
    description: "Reduces the cost of Roll Dodge by 240 Stamina",
    categoryId: "champion-points" as const,
    subcategoryId: "fitness-passives" as const,
    isSlottable: false,
    effects: [
      {
        metricId: "stamina-dodge-cost" as const,
        effectType: "integer" as const,
        effectValue: -240,
      },
    ],
  },
  defiance: {
    id: "defiance" as const,
    esoChampionSkillId: 128,
    name: "Defiance",
    description: "Reduces the cost of Break Free by 220 Stamina",
    categoryId: "champion-points" as const,
    subcategoryId: "fitness-passives" as const,
    isSlottable: false,
    effects: [
      {
        metricId: "break-free-cost" as const,
        effectType: "integer" as const,
        effectValue: -220,
      },
    ],
  },
  rejuvenation: {
    id: "rejuvenation" as const,
    esoChampionSkillId: 35,
    name: "Rejuvenation",
    description: "Grants 90 Health, Magicka, and Stamina Recovery",
    categoryId: "champion-points" as const,
    subcategoryId: "fitness-passives" as const,
    isSlottable: false,
    effects: [
      {
        metricId: "health-recovery" as const,
        effectType: "integer" as const,
        effectValue: 90,
      },
      {
        metricId: "magicka-recovery" as const,
        effectType: "integer" as const,
        effectValue: 90,
      },
      {
        metricId: "stamina-recovery" as const,
        effectType: "integer" as const,
        effectValue: 90,
      },
    ],
  },
  "boundless-vitality": {
    id: "boundless-vitality" as const,
    esoChampionSkillId: 2,
    name: "Boundless Vitality",
    description: "Grants 1400 Max Health",
    categoryId: "champion-points" as const,
    subcategoryId: "fitness-passives" as const,
    isSlottable: false,
    effects: [
      {
        metricId: "health-maximum" as const,
        effectType: "integer" as const,
        effectValue: 1400,
      },
    ],
  },
} satisfies Record<string, ChampionPointTemplate>

export const fitnessPassives = createDataFile<ChampionPointTemplate>()(
  FITNESS_PASSIVE_CHAMPION_POINTS
)
