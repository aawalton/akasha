import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const purifyingBloodyMara = {
  id: "01a0e05d-1465-72ad-a6a7-0496f2c441e6",
  type: "page-type/temper-food-or-drink",
  slug: "purifying-bloody-mara",
  title: "Purifying Bloody Mara",
  description:
    "Increase Max Magicka by 4620 and Max Health by 5051 for 2.5 hours.\nIf you are a vampire, the blood in this drink will also purify you, reducing your Stage by 1.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/disastrously_bloody_mara.dds",
  foodOrDrinkKind: "drink",
  itemId: 87699,
  itemIds: [87699],
  abilityId: 84735,
  seconds: 9000,
  level: "Scaled",
  effects: [
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 4620 },
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 5051 },
  ],
  status: "partially-supported",
  hashPlace: 26,
  createdAt: "2026-09-27T00:56:31.589Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
