import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const frostedBrains = {
  id: "01a0e05d-1464-7bc9-9534-c5ce2381801f",
  type: "page-type/temper-food-or-drink",
  slug: "frosted-brains",
  title: "Frosted Brains",
  description:
    "Increase Max Magicka by 4592 and Health Recovery by 505 for 2.5 hours.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/event_halloween_2016_candy_brain.dds",
  foodOrDrinkKind: "food",
  itemId: 87696,
  itemIds: [87696],
  abilityId: 84725,
  seconds: 9000,
  level: "Scaled",
  effects: [
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 4592 },
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 505 },
  ],
  status: "supported",
  hashPlace: 9,
  createdAt: "2026-09-27T00:56:31.588Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
