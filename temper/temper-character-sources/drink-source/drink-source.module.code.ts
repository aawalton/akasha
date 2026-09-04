import { createSourceFile } from "@akasha/temper-formula-framework/source-file"
import type { FoodOrDrinkTemplate } from "../food-or-drink-source/food-or-drink-source.module.code.ts"

const DRINK = {
  "markarth-mead": {
    id: "markarth-mead" as const,
    name: "Markarth Mead",
    itemId: 68257,
    abilityId: 61322,
    icon: "/esoui/art/icons/crafting_stoneware_bottle_001.dds",
    seconds: 2100,
    description: "Increases Health Recovery by 660 for 35 minutes.",
    level: "CP150",
    categoryId: "food-or-drink" as const,
    subcategoryId: "drink" as const,
    effects: [
      {
        metricId: "health-recovery" as const,
        effectType: "integer" as const,
        effectValue: 660,
      },
    ],
  },

  "muthseras-remorse": {
    id: "muthseras-remorse" as const,
    name: "Muthseras Remorse",
    itemId: 68260,
    abilityId: 61325,
    icon: "/esoui/art/icons/crafting_tea_005.dds",
    seconds: 2100,
    description: "Increases Magicka Recovery by 604 for 35 minutes.",
    level: "CP150",
    categoryId: "food-or-drink" as const,
    subcategoryId: "drink" as const,
    effects: [
      {
        metricId: "magicka-recovery" as const,
        effectType: "integer" as const,
        effectValue: 604,
      },
    ],
  },

  "hagravens-tonic": {
    id: "hagravens-tonic" as const,
    name: "Hagravens Tonic",
    itemId: 68263,
    abilityId: 61328,
    icon: "/esoui/art/icons/crafting_leather_vitriol.dds",
    seconds: 2100,
    description: "Increases Stamina Recovery by 604 for 35 minutes.",
    level: "CP150",
    categoryId: "food-or-drink" as const,
    subcategoryId: "drink" as const,
    effects: [
      {
        metricId: "stamina-recovery" as const,
        effectType: "integer" as const,
        effectValue: 604,
      },
    ],
  },

  "port-hunding-pinot-noir": {
    id: "port-hunding-pinot-noir" as const,
    name: "Port Hunding Pinot Noir",
    itemId: 68264,
    abilityId: 72968,
    icon: "/esoui/art/icons/crafting_dom_beer_001.dds",
    seconds: 3600,
    description: "Increases Health Recovery by 539 and Magicka Recovery by 493 for 1 hour.",
    level: "CP150",
    categoryId: "food-or-drink" as const,
    subcategoryId: "drink" as const,
    effects: [
      {
        metricId: "health-recovery" as const,
        effectType: "integer" as const,
        effectValue: 539,
      },
      {
        metricId: "magicka-recovery" as const,
        effectType: "integer" as const,
        effectValue: 493,
      },
    ],
  },

  "camlorn-sweet-brown-ale": {
    id: "camlorn-sweet-brown-ale" as const,
    name: "Camlorn Sweet Brown Ale",
    itemId: 68268,
    abilityId: 72965,
    icon: "/esoui/art/icons/crafting_dom_wine_001.dds",
    seconds: 3600,
    description: "Increases Health Recovery by 539 and Stamina Recovery by 493 for 1 hour.",
    level: "CP150",
    categoryId: "food-or-drink" as const,
    subcategoryId: "drink" as const,
    effects: [
      {
        metricId: "health-recovery" as const,
        effectType: "integer" as const,
        effectValue: 539,
      },
      {
        metricId: "stamina-recovery" as const,
        effectType: "integer" as const,
        effectValue: 493,
      },
    ],
  },

  "honest-lassie-honey-tea": {
    id: "honest-lassie-honey-tea" as const,
    name: "Honest Lassie Honey Tea",
    itemId: 68270,
    abilityId: 72971,
    icon: "/esoui/art/icons/crafting_tea_004.dds",
    seconds: 3600,
    description: "Increases Magicka and Stamina Recovery by 493 for 1 hour.",
    level: "CP150",
    categoryId: "food-or-drink" as const,
    subcategoryId: "drink" as const,
    effects: [
      {
        metricId: "magicka-recovery" as const,
        effectType: "integer" as const,
        effectValue: 493,
      },
      {
        metricId: "stamina-recovery" as const,
        effectType: "integer" as const,
        effectValue: 493,
      },
    ],
  },

  "crown-refreshing-drink": {
    id: "crown-refreshing-drink" as const,
    name: "Crown Refreshing Drink",
    itemId: 64712,
    abilityId: 17614,
    icon: "/esoui/art/icons/store_tricolor_drink_01.dds",
    seconds: 7200,
    description:
      "Increases Health Recovery by 446, Magicka Recovery by 410, and Stamina Recovery by 410 for 2 hours.",
    level: "Scaled",
    categoryId: "food-or-drink" as const,
    subcategoryId: "drink" as const,
    effects: [
      {
        metricId: "health-recovery" as const,
        effectType: "integer" as const,
        effectValue: 446,
      },
      {
        metricId: "magicka-recovery" as const,
        effectType: "integer" as const,
        effectValue: 410,
      },
      {
        metricId: "stamina-recovery" as const,
        effectType: "integer" as const,
        effectValue: 410,
      },
    ],
  },

  "ghastly-eye-bowl": {
    id: "ghastly-eye-bowl" as const,
    name: "Ghastly Eye Bowl",
    itemId: 87695,
    abilityId: 84700,
    icon: "/esoui/art/icons/event_halloween_2016_skull_cup_eyeballs.dds",
    seconds: 7200,
    description: "Increases Max Magicka by 4592 and Magicka Recovery by 459 for 2 hours.",
    level: "Scaled",
    categoryId: "food-or-drink" as const,
    subcategoryId: "drink" as const,
    effects: [
      {
        metricId: "magicka-maximum" as const,
        effectType: "integer" as const,
        effectValue: 4592,
      },
      {
        metricId: "magicka-recovery" as const,
        effectType: "integer" as const,
        effectValue: 459,
      },
    ],
  },
  "purifying-bloody-mara": {
    id: "purifying-bloody-mara" as const,
    name: "Purifying Bloody Mara",
    itemId: 87699,
    abilityId: 84735,
    icon: "/esoui/art/icons/disastrously_bloody_mara.dds",
    seconds: 7200,
    description:
      "Increases Max Magicka by 4620 and Max Health by 5051 for 2 hours.\nIf you are a vampire, the blood in this drink will also purify you, reducing your Stage by 1.",
    level: "Scaled",
    categoryId: "food-or-drink" as const,
    subcategoryId: "drink" as const,
    effects: [
      {
        metricId: "magicka-maximum" as const,
        effectType: "integer" as const,
        effectValue: 4620,
      },
      {
        metricId: "health-maximum" as const,
        effectType: "integer" as const,
        effectValue: 5051,
      },
    ],
  },
  "pack-leaders-bone-broth": {
    id: "pack-leaders-bone-broth" as const,
    name: "Pack Leaders Bone Broth",
    itemId: 153627,
    abilityId: 127572,
    icon: "/esoui/art/icons/crafting_poisonmaking_reagent_troll_fat.dds",
    seconds: 7200,
    description:
      "Increases Max Stamina by 4620 and Max Health by 5051 for 2 hours.\nIf you are a werewolf, the rich marrow will also slightly ease your transformation.",
    level: "Scaled",
    categoryId: "food-or-drink" as const,
    subcategoryId: "drink" as const,
    effects: [
      {
        metricId: "stamina-maximum" as const,
        effectType: "integer" as const,
        effectValue: 4620,
      },
      {
        metricId: "health-maximum" as const,
        effectType: "integer" as const,
        effectValue: 5051,
      },
    ],
  },
  "bergama-warning-fire": {
    id: "bergama-warning-fire" as const,
    name: "Bergama Warning Fire",
    itemId: 112426,
    abilityId: 86677,
    icon: "/esoui/art/icons/event_newlifefestival_2016_warning_fire.dds",
    seconds: 7200,
    description: "Increases Max Stamina by 4936 and Health Recovery by 539 for 2 hours.",
    level: "Scaled",
    categoryId: "food-or-drink" as const,
    subcategoryId: "drink" as const,
    effects: [
      {
        metricId: "stamina-maximum" as const,
        effectType: "integer" as const,
        effectValue: 4936,
      },
      {
        metricId: "health-recovery" as const,
        effectType: "integer" as const,
        effectValue: 539,
      },
    ],
  },
  "hissmir-fish-eye-rye": {
    id: "hissmir-fish-eye-rye" as const,
    name: "Hissmir Fish-Eye Rye",
    itemId: 101879,
    abilityId: 86559,
    icon: "/esoui/art/icons/event_newlifefestival_2016_fisheye_rye.dds",
    seconds: 7200,
    description:
      "Increases Magicka and Stamina Recovery by 529 for 2 hours. This drink will also grant you insights into what manner of fish spawn in various bodies of water, as well as alertness for nearby fish activity.",
    level: "Scaled",
    categoryId: "food-or-drink" as const,
    subcategoryId: "drink" as const,
    effects: [
      {
        metricId: "magicka-recovery" as const,
        effectType: "integer" as const,
        effectValue: 529,
      },
      {
        metricId: "stamina-recovery" as const,
        effectType: "integer" as const,
        effectValue: 529,
      },
    ],
  },

  "witchmothers-potent-brew": {
    id: "witchmothers-potent-brew" as const,
    name: "Witchmothers Potent Brew",
    itemId: 87697,
    abilityId: 84731,
    icon: "/esoui/art/icons/event_halloween_2016_iron_cup_bones.dds",
    seconds: 7200,
    description:
      "Increases Max Magicka by 2856, Max Health by 3094, and Magicka Recovery by 315 for 2 hours.",
    level: "Scaled",
    categoryId: "food-or-drink" as const,
    subcategoryId: "drink" as const,
    effects: [
      {
        metricId: "magicka-maximum" as const,
        effectType: "integer" as const,
        effectValue: 2856,
      },
      {
        metricId: "health-maximum" as const,
        effectType: "integer" as const,
        effectValue: 3094,
      },
      {
        metricId: "magicka-recovery" as const,
        effectType: "integer" as const,
        effectValue: 315,
      },
    ],
  },
  "corrupting-bloody-mara": {
    id: "corrupting-bloody-mara" as const,
    name: "Corrupting Bloody Mara",
    itemId: 153625,
    abilityId: 127531,
    icon: "/esoui/art/icons/event_halloween_2016_blood_mason_jar.dds",
    seconds: 7200,
    description:
      "Increases Max Magicka by 4620, Max Health by 5051, and Health Recovery by 505 for 2 hours.\nIf you are a vampire, the tainted blood in this drink will corrupt you, increasing your Stage to 4.",
    level: "Scaled",
    categoryId: "food-or-drink" as const,
    subcategoryId: "drink" as const,
    effects: [
      {
        metricId: "magicka-maximum" as const,
        effectType: "integer" as const,
        effectValue: 4620,
      },
      {
        metricId: "health-maximum" as const,
        effectType: "integer" as const,
        effectValue: 5051,
      },
      {
        metricId: "health-recovery" as const,
        effectType: "integer" as const,
        effectValue: 505,
      },
    ],
  },
  "dubious-camoran-throne": {
    id: "dubious-camoran-throne" as const,
    name: "Dubious Camoran Throne",
    itemId: 120763,
    abilityId: 89957,
    icon: "/esoui/art/icons/event_jester_fancystonewarejug.dds",
    seconds: 7200,
    description:
      "Increases Stamina Recovery by 315, Max Stamina by 2856 and Max Health by 3094 for 2 hours.",
    level: "Scaled",
    categoryId: "food-or-drink" as const,
    subcategoryId: "drink" as const,
    effects: [
      {
        metricId: "stamina-recovery" as const,
        effectType: "integer" as const,
        effectValue: 315,
      },
      {
        metricId: "stamina-maximum" as const,
        effectType: "integer" as const,
        effectValue: 2856,
      },
      {
        metricId: "health-maximum" as const,
        effectType: "integer" as const,
        effectValue: 3094,
      },
    ],
  },
  "spring-loaded-infusion": {
    id: "spring-loaded-infusion" as const,
    name: "Spring Loaded Infusion",
    itemId: 133555,
    abilityId: 100488,
    icon: "/esoui/art/icons/justice_stolen_tin_001.dds",
    seconds: 7200,
    description: "Increases Max Health by 4165, and Max Magicka and Stamina by 3867 for 2 hours.",
    level: "Scaled",
    categoryId: "food-or-drink" as const,
    subcategoryId: "drink" as const,
    effects: [
      {
        metricId: "health-maximum" as const,
        effectType: "integer" as const,
        effectValue: 4165,
      },
      {
        metricId: "magicka-maximum" as const,
        effectType: "integer" as const,
        effectValue: 3867,
      },
      {
        metricId: "stamina-maximum" as const,
        effectType: "integer" as const,
        effectValue: 3867,
      },
    ],
  },
} satisfies Record<string, FoodOrDrinkTemplate>

export const drinks = createSourceFile<FoodOrDrinkTemplate>()(DRINK)
