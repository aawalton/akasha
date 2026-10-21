import type { TemperClassMastery } from "akasha/temper/catalog/skill/temper-class-mastery/temper-class-mastery.page-type.types.ts"

export const poundOfFlesh = {
  id: "01a15ea7-5fed-74c9-b417-ecdb579b0ce0",
  type: "page-type/temper-class-mastery",
  slug: "pound-of-flesh",
  title: "Pound of Flesh",
  key: "pound-of-flesh",
  description:
    "Knock upon death's door and demand your due.\n\nWhen you take damage you have a 10% chance to heal 4201 Health and restore 5% of your missing Stamina, up to once per second. This chance increases by 1% for every missing Health percent you have and the healing is based off your Max Health.",
  esoSkillId: 263549,
  class: "temper-class/necromancer",
  hashPlace: 13,
  createdAt: "2026-10-21T13:29:49.800Z",
  updatedAt: "2026-10-21T13:29:49.800Z",
} as const satisfies TemperClassMastery
