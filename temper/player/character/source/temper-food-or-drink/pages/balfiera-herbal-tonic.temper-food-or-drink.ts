import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const balfieraHerbalTonic = {
  id: "01a15a12-c896-70d8-aa91-73e255fb57d2",
  type: "page-type/temper-food-or-drink",
  slug: "balfiera-herbal-tonic",
  title: "Balfiera Herbal Tonic",
  description: "Increase Magicka and Stamina Recovery by 463 for 1.5 hours.",
  icon: "/esoui/art/icons/crafting_dom_beer_001.dds",
  foodOrDrinkKind: "drink",
  itemId: 57215,
  itemIds: [57215, 57216, 57217],
  seconds: 5400,
  level: "CP100",
  effects: [
    { metric: "temper-metric/magicka-recovery", effectType: "integer", value: 463 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 463 },
  ],
  status: "supported",
  hashPlace: 272,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
