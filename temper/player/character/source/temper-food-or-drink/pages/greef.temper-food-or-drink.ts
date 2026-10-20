import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const greef = {
  id: "01a15a12-c8b0-724a-b581-0509eb2f0590",
  type: "page-type/temper-food-or-drink",
  slug: "greef",
  title: "Greef",
  description:
    "Increase Health Recovery by 178 and Magicka and Stamina Recovery by 164 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_stoneware_bottle_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 57155,
  itemIds: [57155],
  seconds: 9000,
  effects: [
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 178 },
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 164 },
    { "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 164 },
  ],
  status: "supported",
  hashPlace: 264,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
