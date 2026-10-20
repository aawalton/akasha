import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const houseHlaaluPumpkinRisotto = {
  id: "01a15a12-c8b1-7451-89da-66edbf7678ab",
  type: "page-type/temper-food-or-drink",
  slug: "house-hlaalu-pumpkin-risotto",
  title: "House Hlaalu Pumpkin Risotto",
  description: "Increase Max Magicka by 5670 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_bowl_002.dds",
  foodOrDrinkKind: "food",
  itemId: 57138,
  itemIds: [57138, 57139, 57140],
  seconds: 3960,
  level: "CP100",
  effects: [{ metric: "temper-metric/magicka-maximum", effectType: "integer", value: 5670 }],
  status: "supported",
  hashPlace: 259,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
