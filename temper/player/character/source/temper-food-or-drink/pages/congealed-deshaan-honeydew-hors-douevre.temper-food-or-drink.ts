import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const congealedDeshaanHoneydewHorsDouevre = {
  id: "01a15a12-c8a8-7c37-ba9e-2c3c71d6149f",
  type: "page-type/temper-food-or-drink",
  slug: "congealed-deshaan-honeydew-hors-douevre",
  title: "congealed Deshaan Honeydew Hors d'Ouevre",
  description: "Increase Max Magicka by 1400 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cooking_grilled_apples.dds",
  foodOrDrinkKind: "food",
  itemId: 37793,
  itemIds: [37793, 37841, 37889, 37937],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 1400 }],
  status: "supported",
  hashPlace: 231,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
