import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const sweetSanguineApples = {
  id: "01a15a12-c8be-7bc0-98c5-1e057265eca2",
  type: "page-type/temper-food-or-drink",
  slug: "sweet-sanguine-apples",
  title: "Sweet Sanguine Apples",
  description:
    "Increase Max Magicka by 5600 for 2.5 hours.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/event_halloween_2016_candy_apple.dds",
  foodOrDrinkKind: "food",
  itemId: 87685,
  itemIds: [87685, 112435],
  seconds: 9000,
  level: "Scaled",
  effects: [{ metric: "temper-metric/magicka-maximum", effectType: "integer", value: 5600 }],
  status: "supported",
  hashPlace: 323,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
