import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const redQueensEyeOpener = {
  id: "01a15a12-c8b8-743a-8326-d36f5853cc6d",
  type: "page-type/temper-food-or-drink",
  slug: "red-queens-eye-opener",
  title: "Red Queen's Eye-Opener",
  description:
    "Increase Health Recovery by 204 and Magicka and Stamina Recovery by 188 for 2.5 hours.",
  icon: "/esoui/art/icons/crafting_dom_beer_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 57156,
  itemIds: [57156],
  seconds: 9000,
  effects: [
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 204 },
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 188 },
    { "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 188 },
  ],
  status: "supported",
  hashPlace: 265,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
