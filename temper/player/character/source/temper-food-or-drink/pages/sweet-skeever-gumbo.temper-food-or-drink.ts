import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const sweetSkeeverGumbo = {
  id: "01a15a12-c8be-745d-9f66-a8d89142e4db",
  type: "page-type/temper-food-or-drink",
  slug: "sweet-skeever-gumbo",
  title: "Sweet Skeever Gumbo",
  description: "Increase Max Health by 2047 and Max Magicka and Max Stamina by 1883 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_soup_005.dds",
  foodOrDrinkKind: "food",
  itemId: 57081,
  itemIds: [57081],
  seconds: 9000,
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 2047 },
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 1883 },
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 1883 },
  ],
  status: "supported",
  hashPlace: 256,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
