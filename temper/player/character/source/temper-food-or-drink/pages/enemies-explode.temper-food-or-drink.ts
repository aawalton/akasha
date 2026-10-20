import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const enemiesExplode = {
  id: "01a15a12-c8ad-77e6-b79e-af66f6b77a55",
  type: "page-type/temper-food-or-drink",
  slug: "enemies-explode",
  title: "Enemies Explode",
  description:
    "Increase Health Recovery by 257 and Magicka and Stamina Recovery by 236 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_spirits_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 33434,
  itemIds: [33434, 33694, 33979, 34027],
  seconds: 9000,
  effects: [
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 257 },
    { metric: "temper-metric/magicka-recovery", effectType: "integer", value: 236 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 236 },
  ],
  status: "supported",
  hashPlace: 186,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
