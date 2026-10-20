import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const cloudrestGoldenAle = {
  id: "01a15a12-c89b-7afb-974f-8c457adb2405",
  type: "page-type/temper-food-or-drink",
  slug: "cloudrest-golden-ale",
  title: "Cloudrest Golden Ale",
  description: "Increase Health Recovery by 138 and Magicka Recovery by 126 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_beer_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 28411,
  itemIds: [28411, 33614, 33947],
  seconds: 5400,
  effects: [
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 138 },
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 126 },
  ],
  status: "supported",
  hashPlace: 68,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
