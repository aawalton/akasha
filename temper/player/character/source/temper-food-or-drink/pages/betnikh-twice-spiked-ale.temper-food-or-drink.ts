import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const betnikhTwiceSpikedAle = {
  id: "01a15a12-c896-7451-aab2-e44a8ba0c7b8",
  type: "page-type/temper-food-or-drink",
  slug: "betnikh-twice-spiked-ale",
  title: "Betnikh Twice-Spiked Ale",
  description:
    "Increase Magicka Recovery by 493 and Health Recovery by 539 for 2.5 hours. This drink is very gassy.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/event_newlifefestival_2016_spiked_ale.dds",
  foodOrDrinkKind: "drink",
  itemId: 112433,
  itemIds: [112433, 188142],
  seconds: 9000,
  level: "Scaled",
  effects: [
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 493 },
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 539 },
  ],
  status: "partially-supported",
  hashPlace: 329,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
