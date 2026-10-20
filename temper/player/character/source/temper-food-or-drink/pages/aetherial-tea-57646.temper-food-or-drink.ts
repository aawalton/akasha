import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const aetherialTea57646 = {
  id: "01a15a12-c892-7eec-bb0b-9f09ad70dc24",
  type: "page-type/temper-food-or-drink",
  slug: "aetherial-tea-57646",
  title: "Aetherial Tea",
  description: "Increase Magicka Recovery by 392 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_tea_005.dds",
  foodOrDrinkKind: "drink",
  itemId: 57646,
  itemIds: [57646, 61069, 61070],
  seconds: 3960,
  level: "CP10",
  effects: [{ metric: "temper-metric/magicka-recovery", effectType: "integer", value: 392 }],
  status: "supported",
  hashPlace: 285,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
