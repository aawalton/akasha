import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const tearsOfJoy = {
  id: "01a15a12-c8c0-7f7c-8046-c014c5bbeed5",
  type: "page-type/temper-food-or-drink",
  slug: "tears-of-joy",
  title: "Tears of Joy",
  description:
    "Increase Health Recovery by 420 and Magicka and Stamina Recovery by 386 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_dom_distill_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 28510,
  itemIds: [28510, 33646, 34033, 46059],
  seconds: 9000,
  level: "CP100",
  effects: [
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 420 },
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 386 },
    { "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 386 },
  ],
  status: "supported",
  hashPlace: 120,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
