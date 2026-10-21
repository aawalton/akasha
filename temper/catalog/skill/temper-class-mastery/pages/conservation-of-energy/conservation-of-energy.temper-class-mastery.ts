import type { TemperClassMastery } from "akasha/temper/catalog/skill/temper-class-mastery/temper-class-mastery.page-type.types.ts"

export const conservationOfEnergy = {
  id: "01a15ea7-5feb-71f3-a311-eaf13b8288a0",
  type: "page-type/temper-class-mastery",
  slug: "conservation-of-energy",
  title: "Conservation of Energy",
  key: "conservation-of-energy",
  description:
    "Spellcasting is second nature to you. A skill honed by tireless study.\n\nUpgrades rank 2 of Blood Magic to work with all abilities with a cost, excluding cost per tick abilities, and restores 230 Magicka and 241 Stamina when it activates. This effect scales off your Max Magicka and Stamina.",
  esoSkillId: 263870,
  class: "temper-class/sorcerer",
  hashPlace: 20,
  createdAt: "2026-10-21T13:29:49.800Z",
  updatedAt: "2026-10-21T13:29:49.800Z",
} as const satisfies TemperClassMastery
