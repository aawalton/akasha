import type { TemperMundusStone } from "akasha/temper/player/character/source/temper-mundus-stone/temper-mundus-stone.page-type.types.ts"

export const theSteed = {
  id: "01a0df6c-b4e2-799a-8a51-ef30623fc33d",
  type: "page-type/temper-mundus-stone",
  slug: "the-steed",
  title: "The Steed",
  description: "Increases Health Recovery by 238 and Movement Speed by 10%",
  esoMundusId: 13977,
  esoIconName: "constellation_stead",
  effects: [
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 238 },
    { metric: "temper-metric/movement-speed", effectType: "fractional-change", value: 0.1 },
  ],
  hashPlace: 10,
} as const satisfies TemperMundusStone
