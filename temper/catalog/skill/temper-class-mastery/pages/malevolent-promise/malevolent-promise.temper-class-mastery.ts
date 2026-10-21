import type { TemperClassMastery } from "akasha/temper/catalog/skill/temper-class-mastery/temper-class-mastery.page-type.types.ts"

export const malevolentPromise = {
  id: "01a15ea7-5fec-7b87-9418-b8c5d530dc82",
  type: "page-type/temper-class-mastery",
  slug: "malevolent-promise",
  title: "Malevolent Promise",
  key: "malevolent-promise",
  description:
    "Death's knell is a familiar song. Share it with your enemies.\n\nUpgrades rank 2 of Corpse Consumption to mark the closest non-player enemy to you with death's touch for 6 seconds, allowing you to use a corpse consuming ability on them. Consuming or replacing this effect forcibly triggers rank 1 of Corpse Consumption's Ultimate generation and triggers rank 2 of Death Gleaning.\n\nThis effect can occur once every 2 seconds.",
  esoSkillId: 263465,
  class: "temper-class/necromancer",
  hashPlace: 11,
  createdAt: "2026-10-21T13:29:49.800Z",
  updatedAt: "2026-10-21T13:29:49.800Z",
} as const satisfies TemperClassMastery
