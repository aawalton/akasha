import type { TemperMundusStone } from "akasha/temper/player/character/source/temper-mundus-stone/temper-mundus-stone.page-type.types.ts"

export const theLady = {
  id: "01a0df6c-b4e1-706c-be4d-d84485f34086",
  type: "page-type/temper-mundus-stone",
  slug: "the-lady",
  title: "The Lady",
  description: "Increases Physical and Spell Resistance by 2744",
  esoMundusId: 13976,
  esoIconName: "constellation_lady",
  effects: [{ metric: "temper-metric/resistance", effectType: "integer", value: 2744 }],
  hashPlace: 3,
} as const satisfies TemperMundusStone
