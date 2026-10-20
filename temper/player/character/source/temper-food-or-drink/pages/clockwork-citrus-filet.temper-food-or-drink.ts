import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const clockworkCitrusFilet = {
  id: "01a0e05d-1464-7066-9988-db86dee1e705",
  type: "page-type/temper-food-or-drink",
  slug: "clockwork-citrus-filet",
  title: "Clockwork Citrus Filet",
  description:
    "Increase Max Health by 3326, Health Recovery by 406, Max Magicka by 3080 and Magicka Recovery by 338 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_skillet_001.dds",
  foodOrDrinkKind: "food",
  itemId: 133556,
  itemIds: [133556],
  abilityId: 100498,
  seconds: 9000,
  level: "Scaled",
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 3326 },
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 406 },
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 3080 },
    { metric: "temper-metric/magicka-recovery", effectType: "integer", value: 338 },
  ],
  status: "supported",
  hashPlace: 14,
  createdAt: "2026-09-27T00:56:31.588Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
