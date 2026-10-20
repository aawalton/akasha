import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const pirateQueenMintTea = {
  id: "01a15a12-c8b7-7c78-a939-e83e05bed433",
  type: "page-type/temper-food-or-drink",
  slug: "pirate-queen-mint-tea",
  title: "Pirate Queen Mint Tea",
  description: "Increase Magicka Recovery by 497 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_beer_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 57648,
  itemIds: [57648],
  seconds: 3960,
  level: "CP100",
  effects: [{ "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 497 }],
  status: "supported",
  hashPlace: 287,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
