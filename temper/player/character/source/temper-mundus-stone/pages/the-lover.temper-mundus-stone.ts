import type { TemperMundusStone } from "akasha/temper/player/character/source/temper-mundus-stone/temper-mundus-stone.page-type.types.ts"

export const theLover = {
  id: "01a0df6c-b4e2-7d38-ac44-fd2f36da9416",
  type: "page-type/temper-mundus-stone",
  slug: "the-lover",
  title: "The Lover",
  description: "Increases Physical and Spell Penetration by 2744",
  esoMundusId: 13981,
  esoIconName: "constellation_lovers",
  effects: [{ metric: "temper-metric/penetration", effectType: "integer", value: 2744 }],
  hashPlace: 4,
} as const satisfies TemperMundusStone
