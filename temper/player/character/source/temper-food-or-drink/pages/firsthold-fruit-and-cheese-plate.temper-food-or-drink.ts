import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const firstholdFruitAndCheesePlate = {
  id: "01a0e05d-1464-757e-ac5a-7f21376f56ad",
  type: "page-type/temper-food-or-drink",
  slug: "firsthold-fruit-and-cheese-plate",
  title: "Firsthold Fruit and Cheese Plate",
  description: "Increase Max Magicka by 6048 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cooking_grilled_apples.dds",
  foodOrDrinkKind: "food",
  itemId: 68236,
  itemIds: [68236, 68237, 68238],
  abilityId: 61260,
  seconds: 3960,
  level: "CP150",
  effects: [{ "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 6048 }],
  status: "supported",
  hashPlace: 2,
  createdAt: "2026-09-27T00:56:31.588Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
