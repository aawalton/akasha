import type { TemperMundusStone } from "akasha/temper/player/character/source/temper-mundus-stone/temper-mundus-stone.page-type.types.ts"

export const theLord = {
  id: "01a0df6c-b4e2-78f8-a774-084667afd136",
  type: "page-type/temper-mundus-stone",
  slug: "the-lord",
  title: "The Lord",
  description: "Increases Maximum Health by 2225",
  esoMundusId: 13978,
  esoIconName: "constellation_lord",
  effects: [{ metric: "temper-metric/health-maximum", effectType: "integer", value: 2225 }],
  hashPlace: 5,
} as const satisfies TemperMundusStone
