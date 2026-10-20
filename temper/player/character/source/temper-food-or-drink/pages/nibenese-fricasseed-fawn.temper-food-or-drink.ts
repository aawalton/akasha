import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const nibeneseFricasseedFawn = {
  id: "01a15a12-c8b6-7be5-b611-1ee6fbb19f40",
  type: "page-type/temper-food-or-drink",
  slug: "nibenese-fricasseed-fawn",
  title: "Nibenese Fricasseed Fawn",
  description: "Increase Max Health by 2572 and Max Magicka and Max Stamina by 2366 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_dom_meat_002.dds",
  foodOrDrinkKind: "food",
  itemId: 33594,
  itemIds: [33594, 33802, 33856, 57084],
  seconds: 9000,
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 2572 },
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 2366 },
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 2366 },
  ],
  status: "supported",
  hashPlace: 201,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
