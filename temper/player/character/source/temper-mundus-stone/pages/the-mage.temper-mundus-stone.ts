import type { TemperMundusStone } from "akasha/temper/player/character/source/temper-mundus-stone/temper-mundus-stone.page-type.types.ts"

export const theMage = {
  id: "01a0df6c-b4e2-723c-98f6-64281137ce93",
  type: "page-type/temper-mundus-stone",
  slug: "the-mage",
  title: "The Mage",
  description: "Increases Maximum Magicka by 2023",
  esoMundusId: 13943,
  esoIconName: "constellation_mage",
  effects: [{ metric: "temper-metric/magicka-maximum", effectType: "integer", value: 2023 }],
  hashPlace: 6,
} as const satisfies TemperMundusStone
