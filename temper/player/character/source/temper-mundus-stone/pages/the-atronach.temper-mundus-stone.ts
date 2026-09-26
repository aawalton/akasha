import type { TemperMundusStone } from "akasha/temper/player/character/source/temper-mundus-stone/temper-mundus-stone.page-type.types.ts"

export const theAtronach = {
  id: "01a0df6c-b4e1-7f95-b3dd-a9e5fea6c435",
  type: "page-type/temper-mundus-stone",
  slug: "the-atronach",
  title: "The Atronach",
  description: "Increases Magicka Recovery by 310",
  esoMundusId: 13982,
  esoIconName: "constellation_atronach",
  effects: [{ metric: "temper-metric/magicka-recovery", effectType: "integer", value: 310 }],
  hashPlace: 2,
} as const satisfies TemperMundusStone
