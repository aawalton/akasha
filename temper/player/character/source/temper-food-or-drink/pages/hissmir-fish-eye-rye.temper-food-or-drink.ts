import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const hissmirFishEyeRye = {
  id: "01a0e05d-1464-7b6a-ab13-d1c1d88a8c47",
  type: "page-type/temper-food-or-drink",
  slug: "hissmir-fish-eye-rye",
  title: "Hissmir Fish-Eye Rye",
  description:
    "Increase Magicka and Stamina Recovery by 529 for 2.5 hours. This drink will also grant you insights into what manner of fish spawn in various bodies of water, as well as alertness for nearby fish activity.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/event_newlifefestival_2016_fisheye_rye.dds",
  foodOrDrinkKind: "drink",
  itemId: 101879,
  itemIds: [101879],
  abilityId: 86559,
  seconds: 9000,
  level: "Scaled",
  effects: [
    { "metric": "temper-metric/magicka-recovery", "effectType": "integer", "value": 529 },
    { "metric": "temper-metric/stamina-recovery", "effectType": "integer", "value": 529 },
  ],
  status: "partially-supported",
  hashPlace: 29,
  createdAt: "2026-09-27T00:56:31.588Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
