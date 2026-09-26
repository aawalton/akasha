import type { TemperMundusStone } from "akasha/temper/player/character/source/temper-mundus-stone/temper-mundus-stone.page-type.types.ts"

export const theThief = {
  id: "01a0df6c-b4e2-7241-9e54-2fd9d5d22fb1",
  type: "page-type/temper-mundus-stone",
  slug: "the-thief",
  title: "The Thief",
  description: "Increases Weapon and Spell Critical Strike ratings by 1212",
  esoMundusId: 13975,
  esoIconName: "constellation_thief",
  effects: [{ metric: "temper-metric/critical-rating", effectType: "integer", value: 1212 }],
  hashPlace: 11,
} as const satisfies TemperMundusStone
