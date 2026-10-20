import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const arenthianBrandy57641 = {
  id: "01a15a12-c894-7688-9f41-1818cd563625",
  type: "page-type/temper-food-or-drink",
  slug: "arenthian-brandy-57641",
  title: "Arenthian Brandy",
  description: "Increase Health Recovery by 485 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_spirits_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 57641,
  itemIds: [57641, 61073, 61074],
  seconds: 3960,
  level: "CP50",
  effects: [{ "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 485 }],
  status: "supported",
  hashPlace: 282,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
