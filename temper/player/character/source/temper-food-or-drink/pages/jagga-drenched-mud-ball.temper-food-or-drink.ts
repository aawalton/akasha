import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const jaggaDrenchedMudBall = {
  id: "01a15a12-c8b2-7a7d-aee3-bb32eddb631f",
  type: "page-type/temper-food-or-drink",
  slug: "jagga-drenched-mud-ball",
  title: 'Jagga-Drenched "Mud Ball"',
  description:
    "Increase Max Magicka and Max Stamina by 4936 for 2.5 hours.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/event_newlifefestival_2016_jagga_mudball.dds",
  foodOrDrinkKind: "food",
  itemId: 112434,
  itemIds: [112434],
  seconds: 9000,
  level: "Scaled",
  effects: [
    { "metric": "temper-metric/magicka-maximum", "effectType": "integer", "value": 4936 },
    { "metric": "temper-metric/stamina-maximum", "effectType": "integer", "value": 4936 },
  ],
  status: "supported",
  hashPlace: 330,
  createdAt: "2026-10-20T16:09:02.865Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
