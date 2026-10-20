import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const auntAlessiasPorkChops = {
  id: "01a15a12-c895-718b-ba78-9cd398658d55",
  type: "page-type/temper-food-or-drink",
  slug: "aunt-alessias-pork-chops",
  title: "Aunt Alessia's Pork Chops",
  description: "Increase Max Health by 3026 and Max Magicka by 2769 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_cooking_grilled_sirloin.dds",
  foodOrDrinkKind: "food",
  itemId: 33804,
  itemIds: [33804, 33864, 33889],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 3026 },
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 2769 },
  ],
  status: "supported",
  hashPlace: 211,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
