import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const ashlanderNixHoundChili = {
  id: "01a15a12-c895-773f-8d37-d481fe55f208",
  type: "page-type/temper-food-or-drink",
  slug: "ashlander-nix-hound-chili",
  title: "Ashlander Nix-Hound Chili",
  description: "Increase Max Health by 4079 and Max Magicka by 3732 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_stew_001.dds",
  foodOrDrinkKind: "food",
  itemId: 33931,
  itemIds: [33931, 57118, 57119],
  seconds: 5400,
  level: "CP10",
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 4079 },
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 3732 },
  ],
  status: "supported",
  hashPlace: 227,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
