import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const bewitchedSugarSkulls = {
  id: "01a0e05d-1464-7b80-a320-3cbbbaa47214",
  type: "page-type/temper-food-or-drink",
  slug: "bewitched-sugar-skulls",
  title: "Bewitched Sugar Skulls",
  description:
    "Increases Max Health by 4620, Max Stamina and Magicka by 4250, and Health Recovery by 462 for 2 hours.",
  icon: "/esoui/art/icons/plate_of_sugarskulls.dds",
  foodOrDrinkKind: "food",
  itemId: 153629,
  abilityId: 127596,
  seconds: 7200,
  level: "Scaled",
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 4620 },
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 4250 },
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 4250 },
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 462 },
  ],
  hashPlace: 17,
} as const satisfies TemperFoodOrDrink
