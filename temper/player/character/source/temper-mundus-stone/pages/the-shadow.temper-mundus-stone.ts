import type { TemperMundusStone } from "akasha/temper/player/character/source/temper-mundus-stone/temper-mundus-stone.page-type.types.ts"

export const theShadow = {
  id: "01a0df6c-b4e2-7087-8360-abd86ebc5622",
  type: "page-type/temper-mundus-stone",
  slug: "the-shadow",
  title: "The Shadow",
  description: "Increases Critical Damage and Healing done by 11%",
  esoMundusId: 13984,
  esoIconName: "constellation_shadow",
  effects: [
    { metric: "temper-metric/critical-damage", effectType: "fractional-change", value: 0.11 },
    {
      metric: "temper-metric/healing-critical-bonus",
      effectType: "fractional-change",
      value: 0.11,
    },
  ],
  hashPlace: 9,
} as const satisfies TemperMundusStone
