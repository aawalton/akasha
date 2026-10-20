import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const saintPelinsTawnyPort = {
  id: "01a15a12-c8b9-70b1-9ffe-1033fcfd2690",
  type: "page-type/temper-food-or-drink",
  slug: "saint-pelins-tawny-port",
  title: "Saint Pelin's Tawny Port",
  description: "Increase Health Recovery by 506 and Magicka Recovery by 463 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_spirits_003.dds",
  foodOrDrinkKind: "drink",
  itemId: 57209,
  itemIds: [57209, 57210, 57211],
  seconds: 5400,
  level: "CP100",
  effects: [
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 506 },
    { metric: "temper-metric/magicka-recovery", effectType: "integer", value: 463 },
  ],
  status: "supported",
  hashPlace: 270,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
