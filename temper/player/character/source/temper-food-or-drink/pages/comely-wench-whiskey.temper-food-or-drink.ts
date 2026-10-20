import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const comelyWenchWhiskey = {
  id: "01a15a12-c8a7-7deb-b5d9-e88555ec0fd6",
  type: "page-type/temper-food-or-drink",
  slug: "comely-wench-whiskey",
  title: "Comely Wench Whiskey",
  description: "Increase Health Recovery by 495 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_distill_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28402,
  itemIds: [28402, 57182, 57185],
  seconds: 3960,
  level: "CP10",
  effects: [{ "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 495 }],
  status: "supported",
  hashPlace: 64,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
