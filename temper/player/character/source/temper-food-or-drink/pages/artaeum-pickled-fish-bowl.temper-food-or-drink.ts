import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const artaeumPickledFishBowl = {
  id: "01a0e05d-1463-7e0e-b68a-576b597afc24",
  type: "page-type/temper-food-or-drink",
  slug: "artaeum-pickled-fish-bowl",
  title: "Artaeum Pickled Fish Bowl",
  description:
    "Increases Max Health by 5414 and Max Magicka by 4938 for 2 hours. Also increases your chance of catching higher quality fish, akin to fishing with another player, which can stack with other similar bonuses.",
  icon: "/esoui/art/icons/crafting_bowl_003.dds",
  foodOrDrinkKind: "food",
  itemId: 139016,
  abilityId: 107748,
  seconds: 7200,
  level: "Scaled",
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 5414 },
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 4938 },
  ],
  hashPlace: 12,
} as const satisfies TemperFoodOrDrink
