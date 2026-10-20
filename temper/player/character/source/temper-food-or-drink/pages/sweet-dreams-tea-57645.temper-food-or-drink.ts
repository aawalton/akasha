import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const sweetDreamsTea57645 = {
  id: "01a15a12-c8bd-72e1-a589-5f6695e673de",
  type: "page-type/temper-food-or-drink",
  slug: "sweet-dreams-tea-57645",
  title: "Sweet Dreams Tea",
  description: "Increase Magicka Recovery by 350 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 57645,
  itemIds: [57645, 61062, 61063],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 350 }],
  status: "supported",
  hashPlace: 284,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
