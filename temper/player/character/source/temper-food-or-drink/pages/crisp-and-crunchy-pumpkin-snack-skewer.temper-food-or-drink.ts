import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const crispAndCrunchyPumpkinSnackSkewer = {
  id: "01a15a12-c8a9-7777-b71e-8eebb2730979",
  type: "page-type/temper-food-or-drink",
  slug: "crisp-and-crunchy-pumpkin-snack-skewer",
  title: "Crisp and Crunchy Pumpkin Snack Skewer",
  description:
    "Increase Max Magicka and Max Stamina by 4592 for 2.5 hours.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/event_halloween_2016_kebab_pumpkin.dds",
  foodOrDrinkKind: "food",
  itemId: 87686,
  itemIds: [87686],
  seconds: 9000,
  level: "Scaled",
  effects: [
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 4592 },
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 4592 },
  ],
  status: "supported",
  hashPlace: 324,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
