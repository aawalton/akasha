import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const lavaFootSoupAndSaltrice = {
  id: "01a0e05d-1465-7aee-99ef-9e1ce29b8372",
  type: "page-type/temper-food-or-drink",
  slug: "lava-foot-soup-and-saltrice",
  title: "Lava Foot Soup and Saltrice",
  description: "Increases Max Stamina by 4936 and Stamina Recovery by 493 for 2 hours.",
  icon: "/esoui/art/icons/event_newlifefestival_2016_dancersfestival_soup.dds",
  foodOrDrinkKind: "food",
  itemId: 112425,
  abilityId: 86673,
  seconds: 7200,
  level: "Scaled",
  effects: [
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 4936 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 493 },
  ],
  hashPlace: 10,
} as const satisfies TemperFoodOrDrink
