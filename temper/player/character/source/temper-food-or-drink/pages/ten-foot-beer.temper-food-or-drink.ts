import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const tenFootBeer = {
  id: "01a15a12-c8c0-7469-a735-e5d090633037",
  type: "page-type/temper-food-or-drink",
  slug: "ten-foot-beer",
  title: "Ten-Foot Beer",
  description:
    "Increase Health Recovery by 283 and Magicka and Stamina Recovery by 260 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_beer_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 28514,
  itemIds: [28514, 33436, 33456, 33739],
  seconds: 9000,
  effects: [
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 283 },
    { metric: "temper-metric/magicka-recovery", effectType: "integer", value: 260 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 260 },
  ],
  status: "supported",
  hashPlace: 123,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
