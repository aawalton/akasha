import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const mistralBananaBunnyHash = {
  id: "01a0e05d-1465-7863-9b12-aa1c83497b20",
  type: "page-type/temper-food-or-drink",
  slug: "mistral-banana-bunny-hash",
  title: "Mistral Banana Bunny Hash",
  description: "Increases Max Health by 5395 and Max Magicka by 4936 for 1 hour.",
  icon: "/esoui/art/icons/crafting_skillet_001.dds",
  foodOrDrinkKind: "food",
  itemId: 68241,
  abilityId: 72959,
  seconds: 3600,
  level: "CP150",
  effects: [
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 5395 },
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 4936 },
  ],
  hashPlace: 4,
} as const satisfies TemperFoodOrDrink
