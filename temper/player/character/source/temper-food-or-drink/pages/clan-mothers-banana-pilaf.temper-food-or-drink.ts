import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const clanMothersBananaPilaf = {
  id: "01a15a12-c89b-736c-9d41-c099b9f2ba76",
  type: "page-type/temper-food-or-drink",
  slug: "clan-mothers-banana-pilaf",
  title: "Clan Mother's Banana Pilaf",
  description: "Increase Max Magicka by 3326 for 1.1 hours.",
  icon: "/esoui/art/icons/crafting_bowl_001.dds",
  foodOrDrinkKind: "food",
  itemId: 33879,
  itemIds: [33879, 33891, 57083],
  seconds: 3960,
  effects: [{ "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 3326 }],
  status: "supported",
  hashPlace: 214,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
