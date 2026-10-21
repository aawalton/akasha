import type { TemperClassMastery } from "akasha/temper/catalog/skill/temper-class-mastery/temper-class-mastery.page-type.types.ts"

export const wildfireEmbers = {
  id: "01a15ea7-5fee-73a2-8371-679a872c1ad6",
  type: "page-type/temper-class-mastery",
  slug: "wildfire-embers",
  title: "Wildfire Embers",
  key: "wildfire-embers",
  description:
    "Fire forged within can never be extinguished. Fan the flames.\n\nWhen your Dragonknight damage over time effects end, you apply a stack of Wildfire Embers to the target, dealing 3577 Flame Damage over 12 seconds. This effect stacks up to 12 times and increases in damage 25% per stack.",
  esoSkillId: 259224,
  class: "temper-class/dragonknight",
  hashPlace: 7,
  createdAt: "2026-10-21T13:29:49.800Z",
  updatedAt: "2026-10-21T13:29:49.800Z",
} as const satisfies TemperClassMastery
