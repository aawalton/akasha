import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const lotusTea = {
  id: "01a15a12-c8b3-7659-be6e-284bc12181aa",
  type: "page-type/temper-food-or-drink",
  slug: "lotus-tea",
  title: "Lotus Tea",
  description: "Increase Magicka Recovery by 105 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28445,
  itemIds: [28445, 32068, 32080, 33654, 33987, 37783, 37831, 37879, 37927],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 105 }],
  status: "supported",
  hashPlace: 87,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
