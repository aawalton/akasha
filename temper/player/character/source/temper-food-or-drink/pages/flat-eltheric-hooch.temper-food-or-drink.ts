import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const flatElthericHooch = {
  id: "01a15a12-c8ad-78fc-b7c5-567749efcfb1",
  type: "page-type/temper-food-or-drink",
  slug: "flat-eltheric-hooch",
  title: "flat Eltheric Hooch",
  description: "Increase Health Recovery by 192 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_stoneware_bottle_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 32091,
  itemIds: [32091, 32103, 37794, 37842],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 192 }],
  status: "supported",
  hashPlace: 150,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
