import type { TemperEsoPlus } from "akasha/temper/player/character/source/temper-eso-plus/temper-eso-plus.page-type.types.ts"

export const esoPlusActive = {
  id: "01a0df67-9204-7459-ad6b-72e5be694fc0",
  type: "page-type/temper-eso-plus",
  slug: "eso-plus-active",
  title: "ESO Plus",
  description:
    "ESO Plus subscription provides 10% bonus to experience, inspiration, gold, alliance points, and tel var stones",
  effects: [
    { metric: "temper-metric/experience-gain", effectType: "fractional-change", value: 0.1 },
    { metric: "temper-metric/inspiration-gain", effectType: "fractional-change", value: 0.1 },
    { metric: "temper-metric/gold-gain", effectType: "fractional-change", value: 0.1 },
    { metric: "temper-metric/alliance-points-gain", effectType: "fractional-change", value: 0.1 },
    { metric: "temper-metric/tel-var-gain", effectType: "fractional-change", value: 0.1 },
  ],
  hashPlace: 1,
} as const satisfies TemperEsoPlus
