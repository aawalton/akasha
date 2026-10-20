import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const comberryBourbon = {
  id: "01a15a12-c8a7-7eb0-b3e2-5be102f63c4a",
  type: "page-type/temper-food-or-drink",
  slug: "comberry-bourbon",
  title: "Comberry Bourbon",
  description: "Increase Health Recovery by 407 and Magicka Recovery by 373 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_dom_distill_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 33420,
  itemIds: [33420, 57188, 57191],
  seconds: 5400,
  level: "CP10",
  effects: [
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 407 },
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 373 },
  ],
  status: "supported",
  hashPlace: 185,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
