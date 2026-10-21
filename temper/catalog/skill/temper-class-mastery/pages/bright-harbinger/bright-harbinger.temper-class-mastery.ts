import type { TemperClassMastery } from "akasha/temper/catalog/skill/temper-class-mastery/temper-class-mastery.page-type.types.ts"

export const brightHarbinger = {
  id: "01a15ea7-5feb-7939-907b-fb72ac7643be",
  type: "page-type/temper-class-mastery",
  slug: "bright-harbinger",
  title: "Bright Harbinger",
  key: "bright-harbinger",
  description:
    "Light's banner instills hope. You are its bearer.\n\nUpgrades rank 2 of Illuminate to also grant Bright Harbinger for the duration, which grants 300 Weapon and Spell Damage to allies and doubles for you.",
  esoSkillId: 263587,
  class: "temper-class/templar",
  hashPlace: 27,
  createdAt: "2026-10-21T13:29:49.800Z",
  updatedAt: "2026-10-21T13:29:49.800Z",
} as const satisfies TemperClassMastery
