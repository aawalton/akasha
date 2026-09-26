import type { TemperMundusStone } from "akasha/temper/player/character/source/temper-mundus-stone/temper-mundus-stone.page-type.types.ts"

export const theTower = {
  id: "01a0df6c-b4e2-74bd-b50f-d6cf7709ff19",
  type: "page-type/temper-mundus-stone",
  slug: "the-tower",
  title: "The Tower",
  description: "Increases Maximum Stamina by 2023",
  esoMundusId: 13985,
  esoIconName: "constellation_tower",
  effects: [{ metric: "temper-metric/stamina-maximum", effectType: "integer", value: 2023 }],
  hashPlace: 12,
} as const satisfies TemperMundusStone
