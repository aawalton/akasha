import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const stickyPorkAndRadishNoodles = {
  id: "01a0e05d-1465-71c3-b594-5ae0c9c06ecc",
  type: "page-type/temper-food-or-drink",
  slug: "sticky-pork-and-radish-noodles",
  title: "Sticky Pork and Radish Noodles",
  description: "Increases Max Health by 5395 and Max Stamina by 4936 for 1 hour.",
  icon: "/esoui/art/icons/crafting_bowl_003.dds",
  foodOrDrinkKind: "food",
  itemId: 68245,
  abilityId: 72956,
  seconds: 3600,
  level: "CP150",
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 5395 },
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 4936 },
  ],
  hashPlace: 5,
} as const satisfies TemperFoodOrDrink
