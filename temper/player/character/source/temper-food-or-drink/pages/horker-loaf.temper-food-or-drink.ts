import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const horkerLoaf = {
  id: "01a15a12-c8b1-7569-b03e-fd9185287456",
  type: "page-type/temper-food-or-drink",
  slug: "horker-loaf",
  title: "Horker Loaf",
  description: "Increase Max Health by 2835 and Max Magicka and Max Stamina by 2608 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_meat_003.dds",
  foodOrDrinkKind: "food",
  itemId: 28331,
  itemIds: [28331, 33886, 33892, 55922, 57097],
  seconds: 9000,
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 2835 },
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 2608 },
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 2608 },
  ],
  status: "supported",
  hashPlace: 54,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
