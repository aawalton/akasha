import { createSourceFile } from "@akasha/temper-formula-framework/source-file"
import type { FoodOrDrinkTemplate } from "../food-or-drink-source/food-or-drink-source.module.code.ts"

export const FOOD = {
  "lilmoth-garlic-hagfish": {
    id: "lilmoth-garlic-hagfish" as const,
    name: "Lilmoth Garlic Hagfish",
    itemId: 68235,
    abilityId: 17407,
    icon: "/esoui/art/icons/crafting_skillet_004.dds",
    seconds: 2100,
    description: "Increases Max Health by 6608 for 35 minutes.",
    level: "CP150",
    categoryId: "food-or-drink" as const,
    subcategoryId: "food" as const,
    effects: [
      {
        metricId: "health-maximum" as const,
        effectType: "integer" as const,
        effectValue: 6608,
      },
    ],
  },

  "firsthold-fruit-and-cheese-plate": {
    id: "firsthold-fruit-and-cheese-plate" as const,
    name: "Firsthold Fruit and Cheese Plate",
    itemId: 68236,
    abilityId: 61260,
    icon: "/esoui/art/icons/crafting_cooking_grilled_apples.dds",
    seconds: 2100,
    description: "Increases Max Magicka by 6048 for 35 minutes.",
    level: "CP150",
    categoryId: "food-or-drink" as const,
    subcategoryId: "food" as const,
    effects: [
      {
        metricId: "magicka-maximum" as const,
        effectType: "integer" as const,
        effectValue: 6048,
      },
    ],
  },

  "hearty-garlic-corn-chowder": {
    id: "hearty-garlic-corn-chowder" as const,
    name: "Hearty Garlic Corn Chowder",
    itemId: 68239,
    abilityId: 61261,
    icon: "/esoui/art/icons/crafting_soup_002.dds",
    seconds: 2100,
    description: "Increases Max Stamina by 6048 for 35 minutes.",
    level: "CP150",
    categoryId: "food-or-drink" as const,
    subcategoryId: "food" as const,
    effects: [
      {
        metricId: "stamina-maximum" as const,
        effectType: "integer" as const,
        effectValue: 6048,
      },
    ],
  },

  "mistral-banana-bunny-hash": {
    id: "mistral-banana-bunny-hash" as const,
    name: "Mistral Banana Bunny Hash",
    itemId: 68241,
    abilityId: 72959,
    icon: "/esoui/art/icons/crafting_skillet_001.dds",
    seconds: 3600,
    description: "Increases Max Health by 5395 and Max Magicka by 4936 for 1 hour.",
    level: "CP150",
    categoryId: "food-or-drink" as const,
    subcategoryId: "food" as const,
    effects: [
      {
        metricId: "health-maximum" as const,
        effectType: "integer" as const,
        effectValue: 5395,
      },
      {
        metricId: "magicka-maximum" as const,
        effectType: "integer" as const,
        effectValue: 4936,
      },
    ],
  },

  "sticky-pork-and-radish-noodles": {
    id: "sticky-pork-and-radish-noodles" as const,
    name: "Sticky Pork and Radish Noodles",
    itemId: 68245,
    abilityId: 72956,
    icon: "/esoui/art/icons/crafting_bowl_003.dds",
    seconds: 3600,
    description: "Increases Max Health by 5395 and Max Stamina by 4936 for 1 hour.",
    level: "CP150",
    categoryId: "food-or-drink" as const,
    subcategoryId: "food" as const,
    effects: [
      {
        metricId: "health-maximum" as const,
        effectType: "integer" as const,
        effectValue: 5395,
      },
      {
        metricId: "stamina-maximum" as const,
        effectType: "integer" as const,
        effectValue: 4936,
      },
    ],
  },

  "invigorated-stewed-merringar": {
    id: "invigorated-stewed-merringar" as const,
    name: "Invigorated Stewed Merringar",
    itemId: 43218,
    abilityId: 72961,
    icon: "/esoui/art/icons/crafting_dom_stew_001.dds",
    seconds: 3600,
    description: "Increases Max Magicka and Stamina by 4928 for 1 hour.",
    level: "CP160",
    categoryId: "food-or-drink" as const,
    subcategoryId: "food" as const,
    effects: [
      {
        metricId: "magicka-maximum" as const,
        effectType: "integer" as const,
        effectValue: 4928,
      },
      {
        metricId: "stamina-maximum" as const,
        effectType: "integer" as const,
        effectValue: 4928,
      },
    ],
  },

  "crown-fortifying-meal": {
    id: "crown-fortifying-meal" as const,
    name: "Crown Fortifying Meal",
    itemId: 64711,
    abilityId: 17581,
    icon: "/esoui/art/icons/store_crownfood_01.dds",
    seconds: 7200,
    description:
      "Increases Max Health by 4462, Max Magicka by 4105, and Max Stamina by 4105 for 2 hours.",
    level: "Scaled",
    categoryId: "food-or-drink" as const,
    subcategoryId: "food" as const,
    effects: [
      {
        metricId: "health-maximum" as const,
        effectType: "integer" as const,
        effectValue: 4462,
      },
      {
        metricId: "magicka-maximum" as const,
        effectType: "integer" as const,
        effectValue: 4105,
      },
      {
        metricId: "stamina-maximum" as const,
        effectType: "integer" as const,
        effectValue: 4105,
      },
    ],
  },

  "crunchy-spider-skewer": {
    id: "crunchy-spider-skewer" as const,
    name: "Crunchy Spider Skewer",
    itemId: 87691,
    abilityId: 84709,
    icon: "/esoui/art/icons/event_halloween_2016_kebab_bugs.dds",
    seconds: 7200,
    description: "Increases Max Magicka by 4592 and Stamina Recovery by 459 for 2 hours.",
    level: "Scaled",
    categoryId: "food-or-drink" as const,
    subcategoryId: "food" as const,
    effects: [
      {
        metricId: "magicka-maximum" as const,
        effectType: "integer" as const,
        effectValue: 4592,
      },
      {
        metricId: "stamina-recovery" as const,
        effectType: "integer" as const,
        effectValue: 459,
      },
    ],
  },
  "frosted-brains": {
    id: "frosted-brains" as const,
    name: "Frosted Brains",
    itemId: 87696,
    abilityId: 84725,
    icon: "/esoui/art/icons/event_halloween_2016_candy_brain.dds",
    seconds: 7200,
    description: "Increases Max Magicka by 4592 and Health Recovery by 505 for 2 hours.",
    level: "Scaled",
    categoryId: "food-or-drink" as const,
    subcategoryId: "food" as const,
    effects: [
      {
        metricId: "magicka-maximum" as const,
        effectType: "integer" as const,
        effectValue: 4592,
      },
      {
        metricId: "health-recovery" as const,
        effectType: "integer" as const,
        effectValue: 505,
      },
    ],
  },
  "lava-foot-soup-and-saltrice": {
    id: "lava-foot-soup-and-saltrice" as const,
    name: "Lava Foot Soup and Saltrice",
    itemId: 112425,
    abilityId: 86673,
    icon: "/esoui/art/icons/event_newlifefestival_2016_dancersfestival_soup.dds",
    seconds: 7200,
    description: "Increases Max Stamina by 4936 and Stamina Recovery by 493 for 2 hours.",
    level: "Scaled",
    categoryId: "food-or-drink" as const,
    subcategoryId: "food" as const,
    effects: [
      {
        metricId: "stamina-maximum" as const,
        effectType: "integer" as const,
        effectValue: 4936,
      },
      {
        metricId: "stamina-recovery" as const,
        effectType: "integer" as const,
        effectValue: 493,
      },
    ],
  },
  "candied-jesters-coins": {
    id: "candied-jesters-coins" as const,
    name: "Candied Jesters Coins",
    itemId: 120762,
    abilityId: 89955,
    icon: "/esoui/art/icons/event_jester_chocolatecoin.dds",
    seconds: 7200,
    description: "Increases Max Stamina by 4592 and Magicka Recovery by 459 for 2 hours.",
    level: "Scaled",
    categoryId: "food-or-drink" as const,
    subcategoryId: "food" as const,
    effects: [
      {
        metricId: "stamina-maximum" as const,
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
  "artaeum-pickled-fish-bowl": {
    id: "artaeum-pickled-fish-bowl" as const,
    name: "Artaeum Pickled Fish Bowl",
    itemId: 139016,
    abilityId: 107748,
    icon: "/esoui/art/icons/crafting_bowl_003.dds",
    seconds: 7200,
    description:
      "Increases Max Health by 5414 and Max Magicka by 4938 for 2 hours. Also increases your chance of catching higher quality fish, akin to fishing with another player, which can stack with other similar bonuses.",
    level: "Scaled",
    categoryId: "food-or-drink" as const,
    subcategoryId: "food" as const,
    effects: [
      {
        metricId: "health-maximum" as const,
        effectType: "integer" as const,
        effectValue: 5414,
      },
      {
        metricId: "magicka-maximum" as const,
        effectType: "integer" as const,
        effectValue: 4938,
      },
    ],
  },

  "jewels-of-misrule": {
    id: "jewels-of-misrule" as const,
    name: "Jewels of Misrule",
    itemId: 120764,
    abilityId: 89971,
    icon: "/esoui/art/icons/event_jester_rockcandy.dds",
    seconds: 7200,
    description:
      "Increases Stamina and Magicka Recovery by 357 and Max Health by 3927 for 2 hours.",
    level: "Scaled",
    categoryId: "food-or-drink" as const,
    subcategoryId: "food" as const,
    effects: [
      {
        metricId: "stamina-recovery" as const,
        effectType: "integer" as const,
        effectValue: 357,
      },
      {
        metricId: "magicka-recovery" as const,
        effectType: "integer" as const,
        effectValue: 357,
      },
      {
        metricId: "health-maximum" as const,
        effectType: "integer" as const,
        effectValue: 3927,
      },
    ],
  },

  "clockwork-citrus-filet": {
    id: "clockwork-citrus-filet" as const,
    name: "Clockwork Citrus Filet",
    itemId: 133556,
    abilityId: 100498,
    icon: "/esoui/art/icons/crafting_skillet_001.dds",
    seconds: 7200,
    description:
      "Increases Max Health by 3326, Health Recovery by 406, Max Magicka by 3080 and Magicka Recovery by 338 for 2 hours.",
    level: "Scaled",
    categoryId: "food-or-drink" as const,
    subcategoryId: "food" as const,
    effects: [
      {
        metricId: "health-maximum" as const,
        effectType: "integer" as const,
        effectValue: 3326,
      },
      {
        metricId: "health-recovery" as const,
        effectType: "integer" as const,
        effectValue: 406,
      },
      {
        metricId: "magicka-maximum" as const,
        effectType: "integer" as const,
        effectValue: 3080,
      },
      {
        metricId: "magicka-recovery" as const,
        effectType: "integer" as const,
        effectValue: 338,
      },
    ],
  },
  "artaeum-takeaway-broth": {
    id: "artaeum-takeaway-broth" as const,
    name: "Artaeum Takeaway Broth",
    itemId: 139018,
    abilityId: 107789,
    icon: "/esoui/art/icons/crafting_soup_004.dds",
    seconds: 7200,
    description:
      "Increases Max Health by 3326, Health Recovery by 406, Max Stamina by 3080 and Stamina Recovery by 338 for 2 hours.",
    level: "Scaled",
    categoryId: "food-or-drink" as const,
    subcategoryId: "food" as const,
    effects: [
      {
        metricId: "health-maximum" as const,
        effectType: "integer" as const,
        effectValue: 3326,
      },
      {
        metricId: "health-recovery" as const,
        effectType: "integer" as const,
        effectValue: 406,
      },
      {
        metricId: "stamina-maximum" as const,
        effectType: "integer" as const,
        effectValue: 3080,
      },
      {
        metricId: "stamina-recovery" as const,
        effectType: "integer" as const,
        effectValue: 338,
      },
    ],
  },
  "orzorgas-smoked-bear-haunch": {
    id: "orzorgas-smoked-bear-haunch" as const,
    name: "Orzorgas Smoked Bear Haunch",
    itemId: 71059,
    abilityId: 72824,
    icon: "/esoui/art/icons/crafting_meat_001.dds",
    seconds: 7200,
    description:
      "Increases Max Health by 4312, Health Recovery by 406 and Stamina and Magicka Recovery by 369 for 2 hours.",
    level: "Scaled",
    categoryId: "food-or-drink" as const,
    subcategoryId: "food" as const,
    effects: [
      {
        metricId: "health-maximum" as const,
        effectType: "integer" as const,
        effectValue: 4312,
      },
      {
        metricId: "health-recovery" as const,
        effectType: "integer" as const,
        effectValue: 406,
      },
      {
        metricId: "stamina-recovery" as const,
        effectType: "integer" as const,
        effectValue: 369,
      },
      {
        metricId: "magicka-recovery" as const,
        effectType: "integer" as const,
        effectValue: 369,
      },
    ],
  },
  "bewitched-sugar-skulls": {
    id: "bewitched-sugar-skulls" as const,
    name: "Bewitched Sugar Skulls",
    itemId: 153629,
    abilityId: 127596,
    icon: "/esoui/art/icons/plate_of_sugarskulls.dds",
    seconds: 7200,
    description:
      "Increases Max Health by 4620, Max Stamina and Magicka by 4250, and Health Recovery by 462 for 2 hours.",
    level: "Scaled",
    categoryId: "food-or-drink" as const,
    subcategoryId: "food" as const,
    effects: [
      {
        metricId: "health-maximum" as const,
        effectType: "integer" as const,
        effectValue: 4620,
      },
      {
        metricId: "stamina-maximum" as const,
        effectType: "integer" as const,
        effectValue: 4250,
      },
      {
        metricId: "magicka-maximum" as const,
        effectType: "integer" as const,
        effectValue: 4250,
      },
      {
        metricId: "health-recovery" as const,
        effectType: "integer" as const,
        effectValue: 462,
      },
    ],
  },
} satisfies Record<string, FoodOrDrinkTemplate>

export const foods = createSourceFile<FoodOrDrinkTemplate>()(FOOD)
