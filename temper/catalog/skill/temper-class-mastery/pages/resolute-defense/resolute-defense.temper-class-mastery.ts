import type { TemperClassMastery } from "akasha/temper/catalog/skill/temper-class-mastery/temper-class-mastery.page-type.types.ts"

export const resoluteDefense = {
  id: "01a15ea7-5fed-7696-b941-15f7049eeb5d",
  type: "page-type/temper-class-mastery",
  slug: "resolute-defense",
  title: "Resolute Defense",
  key: "resolute-defense",
  description:
    "You are as unyielding as a mountain.\n\nEach second you remain Bracing, you increase the amount of damage you block by 6%, up to 5 times. \n\nBlocking damage has a 20% chance to restore 500 Stamina. This effect can occur once every block cost.",
  esoSkillId: 263220,
  class: "temper-class/dragonknight",
  hashPlace: 8,
  createdAt: "2026-10-21T13:29:49.800Z",
  updatedAt: "2026-10-21T13:29:49.800Z",
} as const satisfies TemperClassMastery
