import type { TemperClassMastery } from "akasha/temper/catalog/skill/temper-class-mastery/temper-class-mastery.page-type.types.ts"

export const nothingWasted = {
  id: "01a15ea7-5fed-7012-a310-8df6b3f6cf24",
  type: "page-type/temper-class-mastery",
  slug: "nothing-wasted",
  title: "Nothing Wasted",
  key: "nothing-wasted",
  description:
    "As an abattoir of death, no remnants of life are wasted.\n\nUpgrades rank 2 of Corpse Consumption to also grant a stack of Nothing Wasted for 12 seconds, which increases your Max Health by 2% and Weapon and Spell Damage by 2% per stack, up to 10 times. Stacks decay two at a time instead of all at once.",
  esoSkillId: 263448,
  class: "temper-class/necromancer",
  hashPlace: 10,
  createdAt: "2026-10-21T13:29:49.800Z",
  updatedAt: "2026-10-21T13:29:49.800Z",
} as const satisfies TemperClassMastery
