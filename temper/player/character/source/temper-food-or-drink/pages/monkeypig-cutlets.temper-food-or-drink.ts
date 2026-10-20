import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const monkeypigCutlets = {
  id: "01a15a12-c8b4-7d08-87e8-fe967c66a726",
  type: "page-type/temper-food-or-drink",
  slug: "monkeypig-cutlets",
  title: "Monkeypig Cutlets",
  description: "Increase Max Health by 1710 and Max Magicka by 1565 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_cooking_grilled_sirloin.dds",
  foodOrDrinkKind: "food",
  itemId: 28311,
  itemIds: [28311, 28360, 28385],
  seconds: 5400,
  effects: [
    { "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 1710 },
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 1565 },
  ],
  status: "supported",
  hashPlace: 47,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
