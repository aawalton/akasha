import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const tanethChiliCheeseCorn = {
  id: "01a15a12-c8bf-7180-94fe-17e76eda100d",
  type: "page-type/temper-food-or-drink",
  slug: "taneth-chili-cheese-corn",
  title: "Taneth Chili Cheese Corn",
  description: "Increase Max Stamina by 5670 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_soup_005.dds",
  foodOrDrinkKind: "food",
  itemId: 57141,
  itemIds: [57141, 57142, 57143],
  seconds: 3960,
  level: "CP100",
  effects: [{ metric: "temper-metric/stamina-maximum", effectType: "integer", value: 5670 }],
  status: "supported",
  hashPlace: 260,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
