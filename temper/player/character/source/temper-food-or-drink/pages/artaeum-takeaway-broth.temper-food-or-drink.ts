import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const artaeumTakeawayBroth = {
  id: "01a0e05d-1464-7d67-b9b1-f8f0edd3695e",
  type: "page-type/temper-food-or-drink",
  slug: "artaeum-takeaway-broth",
  title: "Artaeum Takeaway Broth",
  description:
    "Increases Max Health by 3326, Health Recovery by 406, Max Stamina by 3080 and Stamina Recovery by 338 for 2 hours.",
  icon: "/esoui/art/icons/crafting_soup_004.dds",
  foodOrDrinkKind: "food",
  itemId: 139018,
  abilityId: 107789,
  seconds: 7200,
  level: "Scaled",
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 3326 },
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 406 },
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 3080 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 338 },
  ],
  hashPlace: 15,
} as const satisfies TemperFoodOrDrink
