import type { TemperMundusStone } from "akasha/temper/player/character/source/temper-mundus-stone/temper-mundus-stone.page-type.types.ts"

export const theSerpent = {
  id: "01a0df6c-b4e2-7119-943b-3d7bfbc4982d",
  type: "page-type/temper-mundus-stone",
  slug: "the-serpent",
  title: "The Serpent",
  description: "Increases Stamina Recovery by 310",
  esoMundusId: 13974,
  esoIconName: "constellation_serpent",
  effects: [{ metric: "temper-metric/stamina-recovery", effectType: "integer", value: 310 }],
  hashPlace: 8,
} as const satisfies TemperMundusStone
