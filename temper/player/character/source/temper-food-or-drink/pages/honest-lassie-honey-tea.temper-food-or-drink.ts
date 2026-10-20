import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const honestLassieHoneyTea = {
  id: "01a0e05d-1465-7e4f-b018-a6a3cfd68b69",
  type: "page-type/temper-food-or-drink",
  slug: "honest-lassie-honey-tea",
  title: "Honest Lassie Honey Tea",
  description: "Increase Magicka and Stamina Recovery by 493 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_tea_004.dds",
  foodOrDrinkKind: "drink",
  itemId: 68270,
  itemIds: [68270, 68271, 68272],
  abilityId: 72971,
  seconds: 5400,
  level: "CP150",
  effects: [
    { metric: "temper-metric/magicka-recovery", effectType: "integer", value: 493 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 493 },
  ],
  status: "supported",
  hashPlace: 23,
  createdAt: "2026-09-27T00:56:31.589Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
