import type { TemperMundusStone } from "akasha/temper/player/character/source/temper-mundus-stone/temper-mundus-stone.page-type.types.ts"

export const theApprentice = {
  id: "01a0df6c-b4e1-71a1-aef2-291adfb0b9c1",
  type: "page-type/temper-mundus-stone",
  slug: "the-apprentice",
  title: "The Apprentice",
  description: "Increases Spell Damage by 238",
  esoMundusId: 13979,
  esoIconName: "constellation_apprentice",
  effects: [{ metric: "temper-metric/power-spell", effectType: "integer", value: 238 }],
  hashPlace: 1,
} as const satisfies TemperMundusStone
