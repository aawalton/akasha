import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const jewelsOfMisrule = {
  id: "01a0e05d-1465-7024-ba36-c76f5d312d0f",
  type: "page-type/temper-food-or-drink",
  slug: "jewels-of-misrule",
  title: "Jewels of Misrule",
  description: "Increases Stamina and Magicka Recovery by 357 and Max Health by 3927 for 2 hours.",
  icon: "/esoui/art/icons/event_jester_rockcandy.dds",
  foodOrDrinkKind: "food",
  itemId: 120764,
  abilityId: 89971,
  seconds: 7200,
  level: "Scaled",
  effects: [
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 357 },
    { metric: "temper-metric/magicka-recovery", effectType: "integer", value: 357 },
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 3927 },
  ],
  hashPlace: 13,
} as const satisfies TemperFoodOrDrink
