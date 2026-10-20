import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const artaeumPickledFishBowl = {
  id: "01a0e05d-1463-7e0e-b68a-576b597afc24",
  type: "page-type/temper-food-or-drink",
  slug: "artaeum-pickled-fish-bowl",
  title: "Artaeum Pickled Fish Bowl",
  description:
    "Increase Max Health by 5414 and Max Magicka by 4938 for 2.5 hours. Also increases your chance of catching higher quality fish, akin to fishing with another player, which can stack with other similar bonuses.",
  icon: "/esoui/art/icons/crafting_bowl_003.dds",
  foodOrDrinkKind: "food",
  itemId: 139016,
  itemIds: [139016],
  abilityId: 107748,
  seconds: 9000,
  level: "Scaled",
  effects: [
    { "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 5414 },
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 4938 },
  ],
  status: "partially-supported",
  hashPlace: 12,
  createdAt: "2026-09-27T00:56:31.587Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
