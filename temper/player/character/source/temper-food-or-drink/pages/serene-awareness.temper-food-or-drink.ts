import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const sereneAwareness = {
  id: "01a15a12-c8b9-785f-98b7-751af4b58780",
  type: "page-type/temper-food-or-drink",
  slug: "serene-awareness",
  title: "Serene Awareness",
  description: "Increase Magicka and Stamina Recovery by 307 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_dom_distill_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28516,
  itemIds: [28516, 57168, 57169],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/magicka-recovery", effectType: "integer", value: 307 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 307 },
  ],
  status: "supported",
  hashPlace: 124,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
