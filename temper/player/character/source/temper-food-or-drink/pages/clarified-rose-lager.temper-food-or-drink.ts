import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const clarifiedRoseLager = {
  id: "01a15a12-c89b-720c-a026-1ad426d26da7",
  type: "page-type/temper-food-or-drink",
  slug: "clarified-rose-lager",
  title: "Clarified Rose Lager",
  description: "Increase Health Recovery by 203 and Magicka Recovery by 186 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_dom_distill_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 28419,
  itemIds: [28419, 33626, 33959],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 203 },
    { metric: "temper-metric/magicka-recovery", effectType: "integer", value: 186 },
  ],
  status: "supported",
  hashPlace: 73,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
