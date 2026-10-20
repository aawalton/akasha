import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

export const corruptingBloodyMara = {
  id: "01a0e05d-1464-758d-a3e1-8b0e32e4b955",
  type: "page-type/temper-food-or-drink",
  slug: "corrupting-bloody-mara",
  title: "Corrupting Bloody Mara",
  description:
    "Increase Max Magicka by 4620, Max Health by 5051, and Health Recovery by 505 for 2.5 hours.\nIf you are a vampire, the tainted blood in this drink will corrupt you, increasing your Stage to 4.\nThese effects are scaled based on your level.",
  icon: "/esoui/art/icons/event_halloween_2016_blood_mason_jar.dds",
  foodOrDrinkKind: "drink",
  itemId: 153625,
  itemIds: [153625],
  abilityId: 127531,
  seconds: 9000,
  level: "Scaled",
  effects: [
    { metric: "temper-metric/magicka-maximum", effectType: "integer", value: 4620 },
    { metric: "temper-metric/health-maximum", effectType: "integer", value: 5051 },
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 505 },
  ],
  status: "partially-supported",
  hashPlace: 31,
  createdAt: "2026-09-27T00:56:31.588Z",
  updatedAt: "2026-10-20T16:09:02.865Z",
} as const satisfies TemperFoodOrDrink
