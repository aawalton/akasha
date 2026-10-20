import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const congealedOrcrestGarlicAppleJelly = {
  id: "01a15a12-c8a8-7980-9a32-690329cd2002",
  type: "page-type/temper-food-or-drink",
  slug: "congealed-orcrest-garlic-apple-jelly",
  title: "congealed Orcrest Garlic Apple Jelly",
  description: "Increase Max Magicka by 3920 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_cooking_jam_pot.dds",
  foodOrDrinkKind: "food",
  itemId: 32150,
  itemIds: [32150, 32162, 57622],
  seconds: 3960,
  effects: [{ metric: "temper-metric/magicka-maximum", effectType: "integer", value: 3920 }],
  status: "supported",
  hashPlace: 181,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
