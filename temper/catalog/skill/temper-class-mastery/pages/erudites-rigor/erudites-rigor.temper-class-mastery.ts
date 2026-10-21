import type { TemperClassMastery } from "akasha/temper/catalog/skill/temper-class-mastery/temper-class-mastery.page-type.types.ts"

export const eruditesRigor = {
  id: "01a15ea7-5feb-7015-9195-809bb676bb04",
  type: "page-type/temper-class-mastery",
  slug: "erudites-rigor",
  title: "Erudite's Rigor",
  key: "erudites-rigor",
  description:
    "Master the archaic and forge new runes of conflict.\n\nUpgrades Fatewoven Armor to inflict Minor Cowardice on your attacker while granting Major Vitality to you and your group for 4 seconds. You gain 1 Ultimate for every Crux you have.\n\nThese effects can occur once every 2 seconds.",
  esoSkillId: 263412,
  class: "temper-class/arcanist",
  hashPlace: 3,
  createdAt: "2026-10-21T13:29:49.800Z",
  updatedAt: "2026-10-21T13:29:49.800Z",
} as const satisfies TemperClassMastery
