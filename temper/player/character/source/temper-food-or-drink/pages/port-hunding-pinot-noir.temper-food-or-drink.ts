import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const portHundingPinotNoir = {
  id: "01a0e05d-1465-7be8-9381-ae35dcd0ccc7",
  type: "page-type/temper-food-or-drink",
  slug: "port-hunding-pinot-noir",
  title: "Port Hunding Pinot Noir",
  description: "Increases Health Recovery by 539 and Magicka Recovery by 493 for 1 hour.",
  icon: "/esoui/art/icons/crafting_dom_beer_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 68264,
  abilityId: 72968,
  seconds: 3600,
  level: "CP150",
  effects: [
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 539 },
    { metric: "temper-metric/magicka-recovery", effectType: "integer", value: 493 },
  ],
  hashPlace: 21,
} as const satisfies TemperFoodOrDrink
