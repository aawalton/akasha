import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const swill37806 = {
  id: "01a15a12-c8be-7ec2-8929-7814a87f0b4d",
  type: "page-type/temper-food-or-drink",
  slug: "swill-37806",
  title: "Swill",
  description: "Increase Health Recovery by 289 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_dom_beer_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 37806,
  itemIds: [37806, 37854],
  seconds: 3960,
  effects: [{ metric: "temper-metric/health-recovery", effectType: "integer", value: 289 }],
  status: "supported",
  hashPlace: 237,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
