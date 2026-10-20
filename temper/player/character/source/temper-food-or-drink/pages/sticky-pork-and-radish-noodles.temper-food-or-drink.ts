import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const stickyPorkAndRadishNoodles = {
  id: "01a0e05d-1465-71c3-b594-5ae0c9c06ecc",
  type: "page-type/temper-food-or-drink",
  slug: "sticky-pork-and-radish-noodles",
  title: "Sticky Pork and Radish Noodles",
  description: "Increase Max Health by 5395 and Max Stamina by 4936 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_bowl_003.dds",
  foodOrDrinkKind: "food",
  itemId: 68245,
  itemIds: [68245, 68246, 68247],
  abilityId: 72956,
  seconds: 5400,
  level: "CP150",
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 5395 },
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 4936 },
  ],
  status: "supported",
  hashPlace: 5,
  createdAt: "2026-09-27T00:56:31.589Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
