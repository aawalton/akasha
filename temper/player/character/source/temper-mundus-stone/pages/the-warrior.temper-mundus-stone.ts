import type { TemperMundusStone } from "akasha/temper/player/character/source/temper-mundus-stone/temper-mundus-stone.page-type.types.ts"

export const theWarrior = {
  id: "01a0df6c-b4e2-7d04-b536-7734a237bd0d",
  type: "page-type/temper-mundus-stone",
  slug: "the-warrior",
  title: "The Warrior",
  description: "Increases Weapon Damage by 238",
  esoMundusId: 13940,
  esoIconName: "constellation_warrior",
  effects: [{ metric: "temper-metric/power-weapon", effectType: "integer", value: 238 }],
  hashPlace: 13,
} as const satisfies TemperMundusStone
