import type { TemperMundusStone } from "akasha/temper/player/character/source/temper-mundus-stone/temper-mundus-stone.page-type.types.ts"

export const theRitual = {
  id: "01a0df6c-b4e2-7e6f-bb8d-82cc52857436",
  type: "page-type/temper-mundus-stone",
  slug: "the-ritual",
  title: "The Ritual",
  description: "Increases Healing Done by 8%",
  esoMundusId: 13980,
  esoIconName: "constellation_ritual",
  effects: [
    { metric: "temper-metric/healing-done-base", effectType: "fractional-change", value: 0.08 },
  ],
  hashPlace: 7,
  boonBase: 8,
  boonScale: 0.01,
  createdAt: "2026-09-26T20:33:58.498Z",
  updatedAt: "2026-10-21T11:02:47.290Z",
} as const satisfies TemperMundusStone
