import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const alcaireFestivalSwordPie = {
  id: "01a15a12-c893-7b49-8da6-56d9b1c40c0c",
  type: "page-type/temper-food-or-drink",
  slug: "alcaire-festival-sword-pie",
  title: "Alcaire Festival Sword-Pie",
  description:
    "Increase Max Health by 6160 for 2.5 hours.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/event_newlifefestival_2016_sword_pie.dds",
  foodOrDrinkKind: "food",
  itemId: 112439,
  itemIds: [112439],
  seconds: 9000,
  level: "Scaled",
  effects: [{ "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 6160 }],
  status: "supported",
  hashPlace: 331,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
