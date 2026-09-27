import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const packLeadersBoneBroth = {
  id: "01a0e05d-1465-7533-bcaf-6411d25fc797",
  type: "page-type/temper-food-or-drink",
  slug: "pack-leaders-bone-broth",
  title: "Pack Leaders Bone Broth",
  description:
    "Increases Max Stamina by 4620 and Max Health by 5051 for 2 hours.\nIf you are a werewolf, the rich marrow will also slightly ease your transformation.",
  icon: "/esoui/art/icons/crafting_poisonmaking_reagent_troll_fat.dds",
  foodOrDrinkKind: "drink",
  itemId: 153627,
  abilityId: 127572,
  seconds: 7200,
  level: "Scaled",
  effects: [
    { metric: "temper-metric/stamina-maximum", effectType: "integer", value: 4620 },
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 5051 },
  ],
  hashPlace: 27,
} as const satisfies TemperFoodOrDrink
