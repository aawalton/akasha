import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const bewitchedSugarSkulls = {
  id: "01a0e05d-1464-7b80-a320-3cbbbaa47214",
  type: "page-type/temper-food-or-drink",
  slug: "bewitched-sugar-skulls",
  title: "Bewitched Sugar Skulls",
  description:
    "Increase Max Health by 4620, Max Stamina and Magicka by 4250, and Health Recovery by 462 for 2.5 hours.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/plate_of_sugarskulls.dds",
  foodOrDrinkKind: "food",
  itemId: 153629,
  itemIds: [153629],
  abilityId: 127596,
  seconds: 9000,
  level: "Scaled",
  effects: [
    { "metric": "temper-metric/health-maximum", "effectType": "integer", "value": 4620 },
    { "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 4250 },
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 4250 },
    { "metric": "temper-metric/health-recovery", "effectType": "integer", "value": 462 },
  ],
  status: "supported",
  hashPlace: 17,
  createdAt: "2026-09-27T00:56:31.588Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
