import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const deregulatedMushroomStew = {
  id: "01a15a12-c8ac-7f9b-b625-bdd70c1eed34",
  type: "page-type/temper-food-or-drink",
  slug: "deregulated-mushroom-stew",
  title: "Deregulated Mushroom Stew",
  description: "Increase Health Recovery by 539 and Stamina Recovery by 493 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_soup_002.dds",
  foodOrDrinkKind: "food",
  itemId: 133554,
  itemIds: [133554],
  seconds: 9000,
  effects: [
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 539 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 493 },
  ],
  status: "supported",
  hashPlace: 340,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
