import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const blackMarshWamasuLoin = {
  id: "01a15a12-c897-73c1-8e2f-f6447b4f373c",
  type: "page-type/temper-food-or-drink",
  slug: "black-marsh-wamasu-loin",
  title: "Black Marsh Wamasu Loin",
  description: "Increase Max Health by 3355 and Max Magicka by 3070 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_meat_001.dds",
  foodOrDrinkKind: "food",
  itemId: 43158,
  itemIds: [43158, 57092, 57093],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 3355 },
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 3070 },
  ],
  status: "supported",
  hashPlace: 253,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
