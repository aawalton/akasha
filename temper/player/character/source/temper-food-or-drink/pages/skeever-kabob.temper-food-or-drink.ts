import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const skeeverKabob = {
  id: "01a15a12-c8ba-7a9b-83a0-dc4b2787d636",
  type: "page-type/temper-food-or-drink",
  slug: "skeever-kabob",
  title: "Skeever Kabob",
  description:
    "Increase Max Health by 385 for 1.1 hours.\nConsuming this might not be good for your health.",
  icon: "/esoui/art/icons/crafting_meat_004.dds",
  foodOrDrinkKind: "food",
  itemId: 159497,
  itemIds: [159497],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 385 }],
  status: "partially-supported",
  hashPlace: 341,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
