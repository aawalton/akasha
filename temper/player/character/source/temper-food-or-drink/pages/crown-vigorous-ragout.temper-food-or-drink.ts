import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const crownVigorousRagout = {
  id: "01a15a12-c8aa-71d7-a6ee-ac4420acb7d5",
  type: "page-type/temper-food-or-drink",
  slug: "crown-vigorous-ragout",
  title: "Crown Vigorous Ragout",
  description:
    "Increase Max Stamina by 4936 and Max Health by 5395 for 1.5 hours.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/crowncrate_staminahealth_food.dds",
  foodOrDrinkKind: "food",
  itemId: 124676,
  itemIds: [124676],
  seconds: 5400,
  level: "Scaled",
  effects: [
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 4936 },
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 5395 },
  ],
  status: "supported",
  hashPlace: 337,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
