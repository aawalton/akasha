import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const jasmineMoonshine = {
  id: "01a15a12-c8b2-754c-9503-d80ba7decec2",
  type: "page-type/temper-food-or-drink",
  slug: "jasmine-moonshine",
  title: "Jasmine Moonshine",
  description: "Increase Health Recovery by 171 and Magicka Recovery by 156 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_spirits_002.dds",
  foodOrDrinkKind: "drink",
  itemId: 28415,
  itemIds: [28415, 33620, 33953],
  seconds: 5400,
  effects: [
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 171 },
    { metric: "temper-metric/magicka-recovery", effectType: "integer", value: 156 },
  ],
  status: "supported",
  hashPlace: 71,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
