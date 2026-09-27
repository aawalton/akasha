import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const purifyingBloodyMara = {
  id: "01a0e05d-1465-72ad-a6a7-0496f2c441e6",
  type: "page-type/temper-food-or-drink",
  slug: "purifying-bloody-mara",
  title: "Purifying Bloody Mara",
  description:
    "Increases Max Magicka by 4620 and Max Health by 5051 for 2 hours.\nIf you are a vampire, the blood in this drink will also purify you, reducing your Stage by 1.",
  icon: "/esoui/art/icons/disastrously_bloody_mara.dds",
  foodOrDrinkKind: "drink",
  itemId: 87699,
  abilityId: 84735,
  seconds: 7200,
  level: "Scaled",
  effects: [
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 4620 },
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 5051 },
  ],
  hashPlace: 26,
} as const satisfies TemperFoodOrDrink
