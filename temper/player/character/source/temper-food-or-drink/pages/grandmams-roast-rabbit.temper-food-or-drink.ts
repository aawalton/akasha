import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const grandmamsRoastRabbit = {
  id: "01a15a12-c8af-7ebe-95bb-d8ccb80fdad4",
  type: "page-type/temper-food-or-drink",
  slug: "grandmams-roast-rabbit",
  title: "Grandmam's Roast Rabbit",
  description: "Increase Max Health by 4540 and Max Stamina by 4153 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_dom_meat_002.dds",
  foodOrDrinkKind: "food",
  itemId: 33900,
  itemIds: [33900, 57129, 57132],
  seconds: 5400,
  level: "CP50",
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 4540 },
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 4153 },
  ],
  status: "supported",
  hashPlace: 217,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
