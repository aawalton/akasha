import type { TemperClassMastery } from "akasha/temper/catalog/skill/temper-class-mastery/temper-class-mastery.page-type.types.ts"

export const calculatedDefense = {
  id: "01a15ea7-5feb-7953-a6b9-baea1ef5e45a",
  type: "page-type/temper-class-mastery",
  slug: "calculated-defense",
  title: "Calculated Defense",
  key: "calculated-defense",
  description:
    "Success is a certainty when nothing is left to chance.\n\nWhile beginning to use a Sorcerer ability or an ability with a cast time, you gain a damage shield for 0.5 seconds that can absorb 13332 damage. This effect is based off your Max Health. If the shield does not break, you and nearby group members gain 6% Weapon and Spell Damage for 20 seconds.",
  esoSkillId: 263873,
  class: "temper-class/sorcerer",
  hashPlace: 23,
  createdAt: "2026-10-21T13:29:49.800Z",
  updatedAt: "2026-10-21T13:29:49.800Z",
} as const satisfies TemperClassMastery
