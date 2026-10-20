import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const arenthianBrandy = {
  id: "01a15a12-c894-711e-8516-e36952a406a7",
  type: "page-type/temper-food-or-drink",
  slug: "arenthian-brandy",
  title: "Arenthian Brandy",
  description: "Increase Health Recovery by 553 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_spirits_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 33652,
  itemIds: [33652, 34032, 57194],
  seconds: 3960,
  level: "CP50",
  effects: [{ "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 553 }],
  status: "supported",
  hashPlace: 206,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
