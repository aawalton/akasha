import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const aquaVitae = {
  id: "01a15a12-c894-7bbc-b251-9bb51f9d58cf",
  type: "page-type/temper-food-or-drink",
  slug: "aqua-vitae",
  title: "Aqua Vitae",
  description:
    "Increase Health Recovery by 231 and Magicka and Stamina Recovery by 212 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_stoneware_bottle_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 57157,
  itemIds: [57157],
  seconds: 9000,
  effects: [
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 231 },
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 212 },
    { "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 212 },
  ],
  status: "supported",
  hashPlace: 266,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
