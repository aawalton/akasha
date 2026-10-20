import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const invigoratedMountainLager = {
  id: "01a15a12-c8b1-7a91-86a6-eb2d728769ab",
  type: "page-type/temper-food-or-drink",
  slug: "invigorated-mountain-lager",
  title: "Invigorated Mountain Lager",
  description: "Increase Magicka and Stamina Recovery by AB_DERIVED_VALUE for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_dom_beer_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 33601,
  itemIds: [33601, 33985],
  seconds: 5400,
  status: "unsupported",
  hashPlace: 203,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
